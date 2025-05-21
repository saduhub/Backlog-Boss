import "./large-game-card.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function LargeGameCard({
  title,
  imageUrl,
  rating,
  gameGenre,
  platform,
  release,
  icons
}) {
  return (
    <div className="large-game-card">
      <h2 className="largegamecard-title">{title}</h2>
      <img
        className="largegamecard-image"
        src={imageUrl}
        alt={`Cover of ${title}`}
      />
      <div className="largegamecard-rating">
        <p><FontAwesomeIcon icon={icons.star} /> {rating}</p>
        <p><FontAwesomeIcon icon={icons.gamepad} /> {Array.isArray(platform) ? platform.join(" / ") : platform}</p>
        <p><FontAwesomeIcon icon={icons.genre} /> {Array.isArray(gameGenre) ? gameGenre.join(" / ") : gameGenre}</p>
        <p><FontAwesomeIcon icon={icons.calendar} /> {release}</p>
      </div>
    </div>
  );
}

export default LargeGameCard;
