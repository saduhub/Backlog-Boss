import { Navigate } from "react-router-dom";
import Auth from "../utils/auth";

// Components
import LargeGameCard from "../components/game/LargeGameCard.jsx";
import GameStatusBanner from "../components/game/GameStatusBanner.jsx";
import RelatedGamesBanner from "../components/game/RelatedGamesBanner.jsx";
import UserReviewsContainer from "../components/game/UserReviewsContainer.jsx";
import GameReviewForm from "../components/game/GameReviewForm.jsx";

import "../assets/css/Game.css"; 

function Game() {
  const isAuthenticated = Auth.loggedIn();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
//   if (loading) return <p>Loading game...</p>;
//   if (error) return <p>Something went wrong.</p>;

const pictureUrl = "https://media.rawg.io/media/resize/1280/-/games/821/821a40bd0cc0ac7dfb3fe97a7878dc1f.jpg"

  return (
    <section className="game-main-section">
      <LargeGameCard title="Title" imageUrl={pictureUrl} rating="Rating" />

      <GameStatusBanner
        inBacklog={true}
        isFavorite={true}
        inProgress={true}
        isCompleted={false}
      />

      <RelatedGamesBanner related={["Game1", "Game2", "Game3"]} />

      <UserReviewsContainer reviews={["Review1", "Review2"]} />

      <GameReviewForm />
    </section>
  );
}

export default Game;
