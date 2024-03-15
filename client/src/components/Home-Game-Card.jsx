const HomeGameCard = ({game}) => {
  return (
    <article class="home-game-card">
      <div>
        <img src="" alt="game preview" />
      </div>

      <div>
        <h4>
          {game.title}
        </h4>
      </div>

      <div class="home-user-review-rating">
        <div class="home-user-review">
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

        <div class="home-user-rating">
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
        <button class="home-game-button">
          View Details
        </button>
      </div>
    </article>
  );
};

export default HomeGameCard;