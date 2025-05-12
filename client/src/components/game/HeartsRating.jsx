import "./hearts-rating.css";

function HeartsRating({ rating = 0, likes = 0 }) {
  return (
    <div className="hearts-rating">
      <span className="heartsrating-icon">&#9733;</span>
      <span className="heartsrating-value">{rating.toFixed(1)}</span>
      <span className="heartsrating-icon">&#10084;</span>
      <span className="heartsrating-value">{likes}</span>
    </div>
  );
}

export default HeartsRating;
