import { Link } from "react-router-dom";
import "./related-game-card.css";

function RelatedGameCard({ game = {} }) {
  const { _id = "", title = "Title", pictureUrl = "https://res.cloudinary.com/dx7bgdfut/image/upload/v1689908332/TuneStack/vpardqd8t71yai2bdzo8.jpg" } = game;
  return (
    <div className="related-game-card">
      <img
        className="relatedgamecard-image"
        src={pictureUrl}
        alt={title}
      />
      <h4 className="relatedgamecard-title">{title}</h4>
      <Link to={`/game/${_id}`} className="relatedgamecard-button">
        View Details
      </Link>
    </div>
  );
}

export default RelatedGameCard;
