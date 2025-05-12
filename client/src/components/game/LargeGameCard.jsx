import "./large-game-card.css";

function LargeGameCard({
  title = "Game Title",
  imageUrl = "https://res.cloudinary.com/dx7bgdfut/image/upload/v1689908332/TuneStack/vpardqd8t71yai2bdzo8.jpg",
  rating = 0,
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
        <span>&#9733;</span>
        {/* <span>&#9733;</span> {rating.toFixed(1)} */}
      </div>
    </div>
  );
}

export default LargeGameCard;
