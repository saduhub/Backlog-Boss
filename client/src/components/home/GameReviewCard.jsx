import './game-review-card.css'
import { Link } from 'react-router-dom';

function GameReviewCard({ review }) {
    // const currentUsername = localStorage.getItem('username');
    const {
        rating,
        likes,
        reviewText,
        user: { username, profilePictureUrl },
        game: { title, pictureUrl, _id },
        dateOfReview,
    } = review;

    return (
    <div className="game-review-card">
        <div className="gamereviewcard-game-image-container">
            <img className="gamereviewcard-game-image" src={pictureUrl} alt={`Picture of ${title}`} />
        </div>
        <h4 className="gamereviewcard-game-title">{title}</h4>
        <div className='gamereviewcard-review-container'>
            <div className="gamereviewcard-profile-image-container">
                <img className="gamereviewcard-profile-image" src={profilePictureUrl} alt={`Picture of ${title}`} />
            </div>
            <div className="gamereviewcard-review-details-container">
                <p className="gamereviewcard-username">{username}</p>
                <p className="gamereviewcard-review-date">Reviewed: {dateOfReview}</p>
                <p className="gamereviewcard-review-text">{reviewText}</p>
                <div className="gamereviewcard-rating-likes-container">
                    <p className="gamereviewcard-rating"><span>&#9733;</span> {rating}</p>
                    <p className="gamereviewcard-likes"><span>&#10084;</span> {likes}</p>
                </div>
            </div>
        </div>
        <Link to={`/game/${_id}`} className="gamereviewcard-button">
            View Game
        </Link>
    </div>
    )
}

export default GameReviewCard;