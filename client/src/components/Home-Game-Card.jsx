import gamePreview from 'client/src/assets/images/png/game-preview.png';

const HomeGameCard = ({game}) => {
  return (
    // Testing a card container (div) to use flex and gap for each card
    <div className="home-flex home-gap">
      <article className="home-game-card">
        <div>
          <img src={gamePreview} alt="game preview" />
        </div>

        <div>
          <h4>
            {game.title}
          </h4>
        </div>

        <div className="home-user-review-rating">
          <div className="home-user-review">
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

          <div className="home-user-rating">
            <div>
              <img src="" alt="star" />
              <h5>
                {game.rating}
              </h5>
            </div>
            <div>
              <img src="" alt="heart" />
              <h5>
                {game.likes}
              </h5>
            </div>
          </div>
        </div>

        <div>
          <button className="home-game-button">
            View Details
          </button>
        </div>
      </article>
    </div>
  )
}

export default HomeGameCard;