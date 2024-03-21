import '../assets/css/social.css';

import { Link } from 'react-router-dom';

import profilePic from '../assets/images/png/icons8-male-user-16.png';
import star from '../assets/images/png/simplistic-star-icon.png';
import heart from '../assets/images/png/juicy-heart-1.png';

const UserReviews = ({ gameReviews }) => {
  return (
    <div>
      <section className="social-font">
        <h3 className="social-my-p5">
          My Reviews
        </h3>

        <div className="social-review-box social-inner-box social-border-radius social-flex social-flex-wrap social-content-center social-gap">
          {gameReviews &&
            gameReviews.map(review => {
              return (
                <div key={review.id} className="social-card">
                  <div className="social-flex social-items-center">
                    <img src={profilePic} alt="profile pic" className="social-profile-pic" />
                    
                    <div className="social-font">
                      <h5>
                        Username
                      </h5>
                      <p>
                        {review.description}
                      </p>
                    </div>
                  </div>

                  <div>
                    <Link to={`/Games/${review.id}`} className="social-font">
                      {review.game}
                    </Link>
                  </div>

                  <div className="social-flex social-font social-my-p5">
                    <div className="social-flex">
                      <img src={star} alt="star" className="social-icon" />
                      <h5>
                        {review.rating}
                      </h5>
                    </div>
                    <div className="social-flex">
                      <img src={heart} alt="heart" className="social-icon" />
                      <h5>
                        {review.likes}
                      </h5>
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
      </section>
    </div>
  )
}

export default UserReviews