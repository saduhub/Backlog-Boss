import gamePreview from '../assets/images/png/game-preview.png';

const HomeGameCard = ({game}) => {
  return (
    // Testing a card container (div) to use flex and gap for each card
    <div>
      <article className="home-game-card">
        <div className="home-game-preview-image home-border-radius">
          <img src={gamePreview} alt="game preview" />
        </div>

        <div>
          <h4>
            {game.title}
          </h4>
        </div>

        <div className="home-user-review-rating">
          <div className="home-user-review home-flex">
            <div>
              <img src="" alt="profile pic" />
            </div>
            <div>
              <h5>
                {game.username}
              </h5>
              <p>
                {game.review}
              </p>
            </div>
          </div>

          <div className="home-user-rating home-flex home-gap">
            <div className="home-flex">
              <img src="" alt="star" />
              <h5>
                {game.rating}
              </h5>
            </div>
            <div className="home-flex">
              <img src="" alt="heart" />
              <h5>
                {game.likes}
              </h5>
            </div>
          </div>
        </div>

        <div>
          <button className="home-game-button home-border-radius home-font">
            View Details
          </button>
        </div>
      </article>
    </div>
  )
}

export default HomeGameCard;