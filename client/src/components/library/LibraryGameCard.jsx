import './library-game-card.css'
import { Link } from 'react-router-dom';

function LibraryGameCard({ gameInfo }) {
    // const currentUsername = localStorage.getItem('username');
    const {
        // _id: gameId,
        averageRating,
        pictureUrl,
        title,
    } = gameInfo;

    return (
    <div className="library-game-card">
        <div className="librarygamecard-rating-likes-container">
            <p className="librarygamecard-rating"><span>&#9733;</span> {averageRating}</p>
            {/* <p className="librarygamecard-likes"><span>&#10084;</span> {likes}</p> */}
        </div>
        <div className="librarygamecard-game-image-container">
            <img className="librarygamecard-game-image" src={pictureUrl} alt={`Picture of ${title}`} />
        </div>
        <h4 className="librarygamecard-game-title">{title}</h4>
        <div className='librarygamecard-review-container'>
            {/* <div className="librarygamecard-profile-image-container">
                <Link to={`/ProfileOther`} onClick={handleVisitProfile}>
                    <img className="librarygamecard-profile-image" src={profilePictureUrl} alt={`Picture of ${title}`} />
                </Link>
            </div> */}
            <div className="librarygamecard-review-details-container">
                {/* <p className="librarygamecard-username">
                    <Link to={`/ProfileOther`} onClick={handleVisitProfile}>
                        {username}
                    </Link>
                </p>
                <p className="librarygamecard-review-date">Reviewed: {formattedDate}</p>
                <p className="librarygamecard-review-text">
                    {isTextLong ? `${reviewText.substring(0, 21)}... ` : reviewText}
                    {isTextLong && (
                        <Link to={`/game/${gameId}`} className="librarygamecard-readmore-link">
                        more
                        </Link>
                    )}
                </p> */}
                {/* <div className="librarygamecard-rating-likes-container">
                    <p className="librarygamecard-rating"><span>&#9733;</span> {rating}</p>
                    <p className="librarygamecard-likes"><span>&#10084;</span> {likes}</p>
                </div> */}
            </div>
        </div>
        {/* <Link to={`/game/${gameId}`} className="librarygamecard-button">
            View Game
        </Link> */}
    </div>
    )
}

export default LibraryGameCard;