import "./user-reviews-container.css";
import UserReview from "./UserReview.jsx";

function UserReviewsContainer({ reviews = [], meLikedIds, onToggleLike }) {
  return (
    <div className="user-reviews-container">
      <h3 className="userreviewscontainer-header">User Reviews</h3>
      {reviews.map((review) => {
        const hasLiked = meLikedIds.includes(review._id);
        return (
          <UserReview
            key={review._id}
            review={review}
            hasLiked={hasLiked}
            onToggleLike={onToggleLike(hasLiked, review._id)}
          />
        );
      })}
    </div>
  );
}

export default UserReviewsContainer;
