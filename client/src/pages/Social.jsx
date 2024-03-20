import { useState } from 'react';
import { Link } from 'react-router-dom';

import '../assets/css/social.css';

import FriendSearch from '../components/FriendSearch';
import FriendRequest from '../components/FriendRequest';
import FriendList from '../components/FriendList';
import FriendSuggestion from '../components/FriendSuggestion';

import profilePic from '../assets/images/png/icons8-male-user-16.png';
import star from '../assets/images/png/simplistic-star-icon.png';
import heart from '../assets/images/png/juicy-heart-1.png';

const Social = () => {
  let friendRequests = [
    {
      id: 0,
      username: 'Todd',
      profilePictureUrl: profilePic,
    },
    {
      id: 1,
      username: 'Jackie',
      profilePictureUrl: profilePic,
    }
  ];

  let gameReviews = [
    {
      id: 0,
      game: 'Game',
      description: 'Review',
      rating: 78,
      likes: 34,
      created: 3/25/2024,
    },
    {
      id: 1,
      game: 'Game 2',
      description: 'Review 2',
      rating: 78,
      likes: 34,
      created: 2/14/2024,
    }
  ];

  //// Need function to get friend requests
  //// Need function to get user context

  return (
    <div className="social-container social-flex social-flex-col">
      <FriendSearch friendRequests={friendRequests} />

      <FriendRequest friendRequests={friendRequests} />

      <FriendList friendRequests={friendRequests} />

      <FriendSuggestion friendRequests={friendRequests} />

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

export default Social