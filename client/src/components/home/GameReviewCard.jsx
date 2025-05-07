import './game-review-card.css'
import { Link } from 'react-router-dom';

function GameReviewCard({ review }) {
    // const currentUsername = localStorage.getItem('username');
    const {
        rating,
        likes,
        reviewText,
        user: { username, profilePictureUrl, _id: userId },
        game: { title, pictureUrl, _id: gameId },
        dateOfReview,
    } = review;

    const handleVisitProfile = () => {
        localStorage.setItem('_idUserVisited', userId);
    };
    
    const formattedDate = (() => {
        try {
          const date = new Date(Number(dateOfReview));
          return isNaN(date.getTime()) ? 'Invalid Date' : date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          });
        } catch {
          return 'Invalid Date';
        }
    })();

    const isTextLong = reviewText.length > 21;

    return (
    <div className="game-review-card">
        <div className="gamereviewcard-game-image-container">
            <img className="gamereviewcard-game-image" src={pictureUrl} alt={`Picture of ${title}`} />
        </div>
        <h4 className="gamereviewcard-game-title">{title}</h4>
        <div className='gamereviewcard-review-container'>
            <div className="gamereviewcard-profile-image-container">
                <Link to={`/ProfileOther`} onClick={handleVisitProfile}>
                    <img className="gamereviewcard-profile-image" src={profilePictureUrl} alt={`Picture of ${title}`} />
                </Link>
            </div>
            <div className="gamereviewcard-review-details-container">
                <p className="gamereviewcard-username">
                    <Link to={`/ProfileOther`} onClick={handleVisitProfile}>
                        {username}
                    </Link>
                </p>
                <p className="gamereviewcard-review-date">Reviewed: {formattedDate}</p>
                {/* <p className="gamereviewcard-review-text">{reviewText}</p> */}
                <p className="gamereviewcard-review-text">
                    {isTextLong ? `${reviewText.substring(0, 21)}... ` : reviewText}
                    {isTextLong && (
                        <Link to={`/game/${gameId}`} className="gamereviewcard-readmore-link">
                        more
                        </Link>
                    )}
                </p>
                <div className="gamereviewcard-rating-likes-container">
                    <p className="gamereviewcard-rating"><span>&#9733;</span> {rating}</p>
                    <p className="gamereviewcard-likes"><span>&#10084;</span> {likes}</p>
                </div>
            </div>
        </div>
        <Link to={`/game/${gameId}`} className="gamereviewcard-button">
            View Game
        </Link>
    </div>
    )
}

export default GameReviewCard;