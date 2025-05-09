import './library-game-card.css'
// import { Link } from 'react-router-dom';

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
        </div>
        <div className="librarygamecard-game-image-container">
            <img className="librarygamecard-game-image" src={pictureUrl} alt={`Picture of ${title}`} />
        </div>
        <h4 className="librarygamecard-game-title">{title}</h4>
        {/* <Link to={`/game/${gameId}`} className="librarygamecard-button">
            View Game
        </Link> */}
    </div>
    )
}

export default LibraryGameCard;