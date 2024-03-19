import { useState } from 'react';

import '../assets/css/social.css';

import profilePic from '../assets/images/png/icons8-male-user-16.png';
import searchIcon from '../assets/images/png/icons8-search-white.png';

const Social = () => {
  const [ friend, setFriend ] = useState('');
  const [ result , setResult ] = useState([]);

  const handleFriendInput = () => {
    setFriend(document.querySelector('#friendSearch').value);
  }

  const handleFriendSearch = () => {
    //// Query database to look for users with name equal to friend
    setResult(friend);
    setFriend('');
  }

  const handleFriendAccept = () => {

  }

  const handleFriendDecline = () => {

  }

  const handleFriendRemove = () => {
    
  }

  return (
    <div className="social-container social-flex social-flex-col">
      <div className="social-flex social-content-center">
        <div className="social-search-box social-inner-box social-flex social-border-radius">
          <input type="text" onChange={handleFriendInput} id="friendSearch" value={friend} className="social-search-input social-border-radius" />
          <button onSubmit={handleFriendSearch} className="social-search-button social-border-radius social-font">
            <img src={searchIcon} alt="search icon" className="social-search-icon" />
          </button>
        </div>
      </div>
      <section>
      {result &&
        result.map(user => {
          return (
            <div key={user} className="social-flex social-content-between">
              <div>
                <img src={profilePic} alt="profile pic" className="social-profile-pic social-border-radius" />
                <p className="social-font">User</p>
              </div>
              <button className="social-button social-border-radius social-font">
                Add Friend
              </button>
            </div>
          )
        })
      }
      </section>

      <section>
        <h3 className="social-font social-my-p5">
          Friend Requests
        </h3>
        <div className="social-inner-box social-flex social-flex-wrap social-content-between social-border-radius">
          <div className="social-flex social-items-center">
            <img src={profilePic} alt="profile pic" className="social-profile-pic" />
            <p className="social-font">
              Username
            </p>
          </div>
          <div className="social-flex social-gap-p5">
            <button onClick={handleFriendAccept} className="social-button social-font">
              Accept
            </button>
            <button onClick={handleFriendDecline} className="social-button social-font">
              Decline
            </button>
          </div>
        </div>
      </section>

      <section>
        <h3>
          Friend List
        </h3>
        <div className="social-inner-box social-flex social-flex-wrap social-content-between social-border-radius">
          <div className="social-flex social-items-center">
            <img src={profilePic} alt="profile pic" className="social-profile-pic" />
            <p className="social-font">
              Username
            </p>
          </div>
          <div className="social-flex social-gap-p5">
            <button onClick={handleFriendRemove} className="social-button social-font">
              Remove Friend
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Social