import "./user-reviews-container.css";
import UserReview from "./UserReview.jsx";

function UserReviewsContainer({ reviews = [] }) {
  return (
    <div className="user-reviews-container">
      <h3 className="userreviewscontainer-header">User Reviews</h3>
      {reviews.map((r, i) => (
        <UserReview key={i} review={r} />
      ))}
    </div>
  );
}

export default UserReviewsContainer;
