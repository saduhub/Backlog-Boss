import "./hearts-rating.css";
import { motion } from "framer-motion";
import { useState } from "react";

function HeartsRating({
  rating = 0,
  likes = 0,
  hasLikedInitial = false,
  onToggle,
}) {

  const [liked, setLiked] = useState(hasLikedInitial);
  const [count, setCount] = useState(likes);

  const handleClick = async () => {
    setLiked((prev) => !prev);
    setCount((prev) => prev + (liked ? -1 : 1));
    await onToggle();
  };

  return (
    <div className="hearts-rating">
      <span className="heartsrating-icon">&#9733;</span>
      <span className="heartsrating-value">{rating.toFixed(1)}</span>
      <motion.button
        className={`heartsrating-button`}
        whileTap={{ scale: 1.4 }}
        onClick={handleClick}
        aria-label={liked ? "Unlike review" : "Like review"}
      >
        <motion.span
          className="heartsrating-icon"
          animate={{ color: liked ? "#e63946" : "#9f34ff", scale: liked ? 1.2 : 1 }}
          whileHover={{ color:"#e63946" }}
          transition={{ duration: 0.3 }}
        > 
          &#10084;
        </motion.span>
      </motion.button>
      <span className="heartsrating-value">{count}</span>
    </div>
  );
}

export default HeartsRating;
