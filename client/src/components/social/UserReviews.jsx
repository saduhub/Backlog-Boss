import '../../assets/css/social.css';

import { Link } from 'react-router-dom';
// import { useQuery } from '@apollo/client';
// import { QUERY_USER_REVIEWS } from '../../utils/queries';

// import profilePic from '../../assets/images/png/icons8-male-user-16.png';
import star from '../../assets/images/png/simplistic-star-icon.png';
import heart from '../../assets/images/png/juicy-heart-1.png';
// eslint-disable-next-line
const UserReviews = ({ gameReviews, username, profile }) => {
  //// Need User context to grab User ID
/*   const { data } = useQuery(QUERY_USER_REVIEWS, {
    variables: {
      userId: context.id
    }
  })
  const userReviews = data?.userReviews; */
  console.log(gameReviews)

  return (
    <div>
      <section className="social-font">
        <h3 className="social-my-p5">
          My Reviews
        </h3>

        <div className="social-review-box social-inner-box social-border-radius social-flex social-flex-wrap social-content-center social-gap">
          {gameReviews &&
          // eslint-disable-next-line
            gameReviews.map(review => {
              return (
                <div key={review._id} className="social-card">
                  <div className="social-flex social-items-center">
                    <img src={profile} alt="profile pic" className="social-profile-pic" />
                    
                    <div className="social-font">
                      <h5 className='social-username'>
                        {username}
                      </h5>
                    </div>
                  </div>

                  <div>
                    <Link to={`/Game/${review.game._id}`} className="social-font social-game-link">
                      {review.game.title}
                    </Link>
                    <p>
                      {review.reviewText}
                    </p>
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