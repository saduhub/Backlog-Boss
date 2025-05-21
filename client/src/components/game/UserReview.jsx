import "./user-review.css";
import HeartsRating from "./HeartsRating.jsx";

function UserReview({ review = {}, hasLiked, onToggleLike }) {
  const {
    user: { username = "User", profilePictureUrl = "https://res.cloudinary.com/dx7bgdfut/image/upload/v1689908332/TuneStack/vpardqd8t71yai2bdzo8.jpg" } = {},
    dateOfReview = Date.now(),
    rating = 0,
    likes = 0,
    reviewText = "…",
  } = review;

  return (
    <div className="user-review">
      <img
        className="userreview-avatar"
        src={profilePictureUrl}
        alt={username}
      />
      <div className="userreview-content">
        <div className="userreview-header">
          <strong className="userreview-username">{username}</strong>
          <span className="userreview-date">
            {new Date(Number(dateOfReview)).toLocaleDateString()}
          </span>
        </div>
        <div className="userreview-stats">
          <HeartsRating
            rating={rating}
            likes={likes}
            hasLikedInitial={hasLiked}
            onToggle={onToggleLike}
          />
        </div>
        <p className="userreview-text">&ldquo;{reviewText}&rdquo;</p>
      </div>
    </div>
  );
}

export default UserReview;
