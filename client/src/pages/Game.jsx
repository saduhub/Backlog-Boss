import { useParams, Navigate } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
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
} from "../utils/mutations.js";
// Components
import LargeGameCard from "../components/game/LargeGameCard.jsx";
import GameStatusBanner from "../components/game/GameStatusBanner.jsx";
import RelatedGamesBanner from "../components/game/RelatedGamesBanner.jsx";
import UserReviewsContainer from "../components/game/UserReviewsContainer.jsx";
import GameReviewForm from "../components/game/GameReviewForm.jsx";
// Styles and Assets
import "../assets/css/Game.css";
// Game
function Game() {
  // Obtain game id from url to query game after.
  const { id: gameId } = useParams();
  // Redirect if not authenticated
  if (!Auth.loggedIn()) return <Navigate to="/login" replace />;
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

  // const [addReview] = useMutation(ADD_REVIEW);
  // Get game info
  const { data, loading, error, refetch } = useQuery(QUERY_GAME, {
    variables: { gameId }
  });
  // Get Related Games Info
  const { data: relatedData, loading: relatedLoading } = useQuery(
    RELATED_GAMES_GENRE, 
    { variables: { genres: data?.game?.genre || [], limit: 20 }, skip: !data?.game?.genre?.length }
  );

  if (loading) return <p>Loading game...</p>;
  if (error)   return <p>Something went wrong.</p>;
  if (relatedLoading) {
    return <p>Loading related games…</p>;
  }
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
    games100Completed= [],
  } = me || {};

  // console.log (me);
  // console.log(gamesInProgress)
  // Evalute if game ids in array match game id 
  const inBacklog = gamesInBacklog.some((g) => g._id === game._id);
  const isFavorite = gamesInFavorites.some((g) => g._id === game._id);
  const inProgress = gamesInProgress.some((g) => g._id === game._id);
  const isCompleted = gamesCompleted.some((g) => g._id === game._id);
  const is100Completed = games100Completed.some((g) => g._id === game._id);
  // Function that handles the passed mutation called by each button in GameStatusBanner
  const handleToggle = (flag, addMutation, removeMutation) => async () => {
    if (flag) {
      await removeMutation({ variables: { gameId } });
    } else {
      await addMutation({ variables: { gameId } });
    }
    await refetch();  // re‑pull `me` so your banner updates
  };

  return (
    <section className="game-main-section">
      <LargeGameCard
        title={title}
        imageUrl={pictureUrl}
        rating={averageRating}
        gameGenre={genre}
        platform={platforms}
        release={releaseDate}
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

      <UserReviewsContainer reviews={reviews} />

      {/* <GameReviewForm onSubmit={} /> */}
      <GameReviewForm />
    </section>
  );
}

export default Game;
