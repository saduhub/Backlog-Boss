// import '../../assets/css/social.css';
import './SocialUserReview.css';

import { Link } from 'react-router-dom';
// import { useQuery } from '@apollo/client';
// import { QUERY_USER_REVIEWS } from '../../utils/queries';

// import profilePic from '../../assets/images/png/icons8-male-user-16.png';
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
                <div key={review._id} className="socialuser-review">
                  <img src={profile} alt="profile pic" className="socialuser-avatar" />

                  <div className="socialuser-content">
                    <div className="socialuser-header">
                      <strong className="socialuser-username">{username}</strong>
                      <span className="socialuser-date">
                        {new Date(Number(review.dateOfReview)).toLocaleDateString()}
                      </span>
                    </div>

                    <Link to={`/Game/${review.game._id}`} className="socialuser-gamename">
                      {review.game.title}
                    </Link>

                    <div className="socialuser-stats">
                      <div className="socialuser-stat">
                        <span className="socialuser-icon">&#9733;</span>
                        <span>{review.rating}</span>
                      </div>
                      <div className="socialuser-stat">
                        <span className="socialuser-icon">&#10084;</span>
                        <span>{review.likes}</span>
                      </div>
                    </div>

                    <p className="socialuser-text">&ldquo;{review.reviewText}&rdquo;</p>
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