import "./large-game-card.css";

function LargeGameCard({
  title,
  imageUrl,
  rating,
  gameGenre,
  platform,
  release,
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
        <p><span>&#9733;</span> {rating}</p>
        <p><span>&#9733;</span> {platform}</p>
        <p><span>&#9733;</span> {gameGenre}</p>
        <p><span>&#9733;</span> {release}</p>
      </div>
    </div>
  );
}

export default LargeGameCard;
