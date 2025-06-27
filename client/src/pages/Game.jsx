import { useParams, Navigate } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { useState } from "react";
import Auth from "../utils/auth";
// Queries and Mutations
import { QUERY_GAME, RELATED_GAMES_GENRE } from "../utils/queries.js";
import {
  ADD_TO_BACKLOG,
  ADD_TO_FAVORITES,
  ADD_TO_IN_PROGRESS,
  ADD_TO_COMPLETED,
  ADD_TO_100COMPLETED,
  REMOVE_FROM_BACKLOG,
  REMOVE_FROM_FAVORITES,
  REMOVE_FROM_IN_PROGRESS,
  REMOVE_FROM_COMPLETED,
  REMOVE_FROM_100COMPLETED,
  ADD_REVIEW,
  ADD_LIKE_TO_REVIEW,
  REMOVE_LIKE_FROM_REVIEW,
} from "../utils/mutations.js";
// Components
import LargeGameCard from "../components/game/LargeGameCard.jsx";
import GameStatusBanner from "../components/game/GameStatusBanner.jsx";
import RelatedGamesBanner from "../components/game/RelatedGamesBanner.jsx";
import UserReviewsContainer from "../components/game/UserReviewsContainer.jsx";
import GameReviewForm from "../components/game/GameReviewForm.jsx";
import Footer from '../components/Footer.jsx';
import ErrorFallbackServer from '../components/ErrorFallbackServer';
// Styles and Assets
import "../assets/css/Game.css";
import {
  faStar,
  faGamepad,
  faPuzzlePiece,
  faCalendarAlt,
} from "@fortawesome/free-solid-svg-icons";
// Game
function Game() {
  //State
  const [mutationError, setMutationError] = useState(null);
  const [mutationErrorCount, setMutationErrorCount] = useState(0);
  // Params and Auth
  const { id: gameId } = useParams();
  const isAuth = Auth.loggedIn();
  // Get game info
  const { data, loading, error, refetch } = useQuery(QUERY_GAME, {
    variables: { gameId },
    skip: !isAuth,
  });
  // Get Related Games Info
  const { data: relatedData, loading: relatedLoading } = useQuery(
    RELATED_GAMES_GENRE, 
    { variables: { genres: data?.game?.genre || [], limit: 20 }, skip: !isAuth || !data?.game?.genre?.length }
  );

  // Prepare mutations
  const [addToBacklog]   = useMutation(ADD_TO_BACKLOG);
  const [removeFromBacklog]   = useMutation(REMOVE_FROM_BACKLOG);
  const [addToFavorites] = useMutation(ADD_TO_FAVORITES);
  const [removeFromFavorites] = useMutation(REMOVE_FROM_FAVORITES);
  const [addToInProgress]= useMutation(ADD_TO_IN_PROGRESS);
  const [removeFromInProgress]= useMutation(REMOVE_FROM_IN_PROGRESS);
  const [addToCompleted] = useMutation(ADD_TO_COMPLETED);
  const [removeFromCompleted] = useMutation(REMOVE_FROM_COMPLETED);
  const [addTo100Completed] = useMutation(ADD_TO_100COMPLETED);
  const [removeFrom100Completed] = useMutation(REMOVE_FROM_100COMPLETED);
  const [addLikeToReview] = useMutation(ADD_LIKE_TO_REVIEW);
  const [removeLikeFromReview] = useMutation(REMOVE_LIKE_FROM_REVIEW);
  // const [addReview] = useMutation(ADD_REVIEW);

  const [addReview] = useMutation(ADD_REVIEW, {
    refetchQueries: [
      { query: QUERY_GAME, variables: { gameId } }
    ],
    awaitRefetchQueries: true,
  });

  if (!isAuth) return <Navigate to="/login" replace />;
  if (loading) return <p>Loading game…</p>;
  // Note: I'm not explicitly handling `error` from RELATED_GAMES_GENRE because its value is non-critical. If it fails, the fallback value of [] ensures the app still renders safely.
  if (error) {
    return (
      <ErrorFallbackServer
        error="Server-side error"
        retry={() => window.location.reload()}
        fullPage={true}
      />
    );
  }
  if (relatedLoading) return <p>Loading related games…</p>;
  // Destructure results to later eveluate if game in array matches the game id
  const { game, me } = data;

  const {
    _id,
    title,
    pictureUrl,
    averageRating,
    reviews,
    genre,
    platforms,
    releaseDate,
  } = game;

  const {
    gamesCompleted = [],
    gamesInBacklog = [],
    gamesInFavorites = [],
    gamesInProgress = [],
    games100Completed = [],
    likedReviews = [],
  } = me || {};
  // console.log (me);
  // console.log(gamesInProgress)
  // Evalute if game ids in array match game id 
  const inBacklog = gamesInBacklog.some((g) => g._id === game._id);
  const isFavorite = gamesInFavorites.some((g) => g._id === game._id);
  const inProgress = gamesInProgress.some((g) => g._id === game._id);
  const isCompleted = gamesCompleted.some((g) => g._id === game._id);
  const is100Completed = games100Completed.some((g) => g._id === game._id);
  // Status Button Handler that passes mutation called by each button in GameStatusBanner
  const handleToggle = (flag, addMutation, removeMutation) => async () => {
    try {
      if (flag) {
        await removeMutation({ variables: { gameId } });
      } else {
        await addMutation({ variables: { gameId } });
      }
      await refetch();  // re‑pull me query so the related games in genre banner updates
      setMutationError(null);
      setMutationErrorCount(0);
    } catch (err) {
      setMutationErrorCount((prev) => prev + 1);
      setMutationError("Failed to update game status. Please try again.");
    }
  };
  // Evalute if review ids in array match review id 
  const meLikedIds = likedReviews?.map((r) => r._id) ?? [];
  // Like Button Handler that passes mutation called by heart button in HeartsRating
  const handleToggleLike = (hasLiked, reviewId) => async () => {
    try {
      if (hasLiked) {
        await removeLikeFromReview({ variables: { reviewId } });
      } else {
        await addLikeToReview({ variables: { reviewId } });
      }
      await refetch();
      setMutationError(null);
      setMutationErrorCount(0);
    } catch (err) {
      setMutationErrorCount((prev) => prev + 1);
      setMutationError("Failed to update like status. Try again later.");
    }
  };
  //Review Form Handler Passed to ReviewForm Component to Handle Review Submission
  const handleAddReview = async ({ rating, reviewText }) => {
    try {
      //Retrieve Response Data From the addReview Mutation Being Triggered.
      await addReview({
        variables: { gameId: _id, rating, reviewText }
      });
      setMutationError(null);
      setMutationErrorCount(0);
    } catch (err) {
      setMutationErrorCount((prev) => prev + 1);
      setMutationError("Failed to submit review. Please try again.");
    }
  };

  return (
    <>
      {mutationError && (
        <p className="game-mutation-error-banner">
          {mutationError}
          {mutationErrorCount >= 2 && <span> ({mutationErrorCount})</span>}
        </p>
      )}
      <section className="game-main-section">
        <LargeGameCard
          title={title}
          imageUrl={pictureUrl}
          rating={averageRating}
          gameGenre={genre}
          platform={platforms}
          release={releaseDate}
          icons={{
          star: faStar,
          gamepad: faGamepad,
          genre: faPuzzlePiece,
          calendar: faCalendarAlt,
        }}
        />

        <GameStatusBanner
          inBacklog={inBacklog}
          onBacklog={handleToggle(inBacklog, addToBacklog, removeFromBacklog)}
          isFavorite={isFavorite}
          onFavorite={handleToggle(isFavorite, addToFavorites, removeFromFavorites)}
          inProgress={inProgress}
          onInProgress={handleToggle(inProgress, addToInProgress, removeFromInProgress)}
          isCompleted={isCompleted}
          onCompleted={handleToggle(isCompleted, addToCompleted, removeFromCompleted)}
          is100Completed={is100Completed}
          on100Completed={handleToggle(is100Completed, addTo100Completed, removeFrom100Completed)}
        />

        <RelatedGamesBanner 
          loading={relatedLoading}
          related={relatedData?.relatedGamesByGenre || gamesInProgress}
          currentGameId={_id}
        />

        <UserReviewsContainer 
          reviews={reviews}
          meLikedIds={meLikedIds}
          onToggleLike={handleToggleLike} 
        />

        <GameReviewForm onSubmit={handleAddReview} />
      </section>
      <Footer />
    </>
  );
}

export default Game;
