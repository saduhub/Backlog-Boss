import { useState } from "react";
import "./game-review-form.css";

function GameReviewForm({ onSubmit = () => {} }) {
  const [rating, setRating] = useState(1);
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ rating, text });
    setRating(1);
    setText("");
  };

  return (
    <form className="game-review-form" onSubmit={handleSubmit}>
      <label className="gamereviewform-label">
        Rating:
        <select
          className="gamereviewform-select"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
        >
          {[1, 2, 3, 4, 5].map((n) => (
            <option key={n} value={n}>
              {n} star{n > 1 && "s"}
            </option>
          ))}
        </select>
      </label>
      <textarea
        className="gamereviewform-textarea"
        placeholder="Write your review here…"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button className="gamereviewform-button" type="submit">
        Submit Review
      </button>
    </form>
  );
}

export default GameReviewForm;
