import { Link } from 'react-router-dom';

import gamePreview from '../assets/images/png/game-preview.png';
import profilePic from '../assets/images/png/icons8-male-user-16.png';
import star from '../assets/images/png/simplistic-star-icon.png';
import heart from '../assets/images/png/juicy-heart-1.png';

const HomeGameCard = ({game}) => {
  return (
    // Testing a card container (div) to use flex and gap for each card
    <div className="home-w-33 home-flex home-content-center home-items-center">
      <article className="home-game-card">
        <img src={game.background_image} alt="game preview" className="home-game-preview-image home-border-radius home-object-cover" />

        <h4 className="home-font home-my-p5">
          {game.name}
        </h4>

        <div className="home-flex home-items-center">
          <img src={profilePic} alt="profile pic" className="home-profile-pic" />
          
          <div className="home-font">
            <h5>
              Username
            </h5>
            <p className="home-overflow-ellipses">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae, officia repellat temporibus iusto, ratione enim, nemo doloribus ipsum ea omnis veniam inventore qui deleniti?
            </p>
          </div>
        </div>

        <div className="home-flex home-font home-my-p5">
          <div className="home-flex">
            <img src={star} alt="star" className="home-icon" />
            <h5>
              {game.rating}
            </h5>
          </div>
          <div className="home-flex">
            <img src={heart} alt="heart" className="home-icon" />
            <h5>
              {game.ratings_count}
            </h5>
          </div>
        </div>

        <div>
          <button className="home-game-button home-border-radius">
            <Link to={`/Games/${game.id}`} className="home-font">
              View Details
            </Link>
          </button>
        </div>
      </article>
    </div>
  )
}

export default HomeGameCard;