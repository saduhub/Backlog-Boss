import { Link } from "react-router-dom";
import "./related-game-card.css";

function RelatedGameCard({ gameArray }) {
  const { _id: gameId, pictureUrl, title } = gameArray;
  return (
    <div className="related-game-card">
      <img
        className="relatedgamecard-image"
        src={pictureUrl}
        alt={title}
      />
      <h4 className="relatedgamecard-title">{title}</h4>
      <Link to={`/game/${gameId}`} className="relatedgamecard-button">
        View Details
      </Link>
    </div>
  );
}

export default RelatedGameCard;
