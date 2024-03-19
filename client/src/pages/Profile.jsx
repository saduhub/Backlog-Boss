import { useState } from 'react';
import '../assets/css/profile.css';
import logo from '../assets/images/svg/backlogbosslogowhite.svg'
import SignUpForm from '../components/SignUpForm';
import LoginForm from '../components/LoginForm';

function Profile() {
  const [showLogin, setShowLogin] = useState(false);
  // Will remove
  const isAuthenticated = true;
  const handleShowLogin = () => setShowLogin(true);
  const handleShowSignUp = () => setShowLogin(false);

  if (isAuthenticated) {
    return (
      <section className='profile-main-section'>
          {/* User Card, Game Stats, Challenges */}
          <div className='profile-user-stats-challenges'>
            {/* User Card */}
            <div className="profile-user">
              <img src={logo} alt="Placeholder" />
              <div className='profile-user-since-stats'>
                <div className="profile-username-since">
                  <h2>Username</h2>
                  <h3>Member since 2024</h3>
                </div>
                <div className="profile-user-stats">
                  <div className="profile-user-games">
                    <h3>5</h3>
                    <h3>Games Backlogged</h3>
                  </div>
                  <div className="profile-favorite-games">
                    <h3>3</h3>
                    <h3>Favorites</h3>
                  </div>
                  <div className="profile-rated-games">
                    <h3>45</h3>
                    <h3>Rated Games</h3>
                  </div>
                </div>
              </div>
            </div>
            {/* Game Stats */}
            <div className="profile-games">
              <h2>Game Stats</h2>
              <div className="profile-game-stats">
                {/* Completed Games */}
                <div className="profile-completed-games">
                  <div className='profile-completed-image'>
                    <img src={logo} alt="placeholder" />
                  </div>
                  <h3>Games Completed</h3>
                  <h3>5</h3>
                </div>
                {/* User Score */}
                <div className="profile-score-games">
                  <div className='profile-score-image'>
                    <img src={logo} alt="placeholder" />
                  </div>
                  <h3>User Score</h3>
                  <h3>500</h3>
                </div>
                {/* 100% Completion  */}
                <div className="profile-onehundred-games">
                  <div className='profile-onehundred-image'>
                    <img src={logo} alt="placeholder" />
                  </div>
                  <h3>100% Completed</h3>
                  <h3>8</h3>
                </div>
              </div>
            </div>
            {/* Challenges */}
            <div className="profile-challenges">
              <h2>Challenges</h2>
              {/* Reviewed */}
              <div className="profile-games-reviewed">
                <div className="profile-reviewed-image">
                  <img src={logo} alt="placeholder" />
                </div>
                <div className="profile-progress">
                  <div className="profile-title-number">
                    <h3>Games Reviewed</h3>
                    <h4>37/50</h4>
                  </div>
                  <div className='profile-progress-bar'></div>
                  <h5>Takes the time!</h5>
                </div>
              </div>
              {/* Likes */}
              <div className="profile-likes-gardnered">
                <div className="profile-likes-image">
                  <img src={logo} alt="placeholder" />
                </div>
                <div className="profile-progress">
                  <div className="profile-title-number">
                    <h3>Games Reviewed</h3>
                    <h4>37/50</h4>
                  </div>
                  <div className='profile-progress-bar'></div>
                  <h5>Popular!</h5>
                </div>
              </div>
            </div>
          </div>
          <div className='profile-suggestions-friends'>
            {/* Game Suggestions */}
            <h2>Game Suggestions</h2>
            <div className="profile-game-suggestions">
              {/* Game */}
              <div className="profile-game-suggested">
                <img src={logo} alt="placeholder" />
                <h3>Game 1</h3>
                <button>+</button>
              </div>
              {/* Game */}
              <div className="profile-game-suggested">
                <img src={logo} alt="placeholder" />
                <h3>Game 2</h3>
                <button>+</button>
              </div>
              {/* Game */}
              <div className="profile-game-suggested">
                <img src={logo} alt="placeholder" />
                <h3>Game 3</h3>
                <button>+</button>
              </div>
              {/* Explore */}
              <button>Explore</button>
            </div>
            {/* Friends */}
            <h2>Friends</h2>
            <div className="profile-friend-list">
              {/* Friend */}
              <div className="profile-friend-listed">
                <img src={logo} alt="placeholder" />
                <h3>friend 1</h3>
                <button>Visit</button>
              </div>
              {/* Friend */}
              <div className="profile-friend-listed">
                <img src={logo} alt="placeholder" />
                <h3>friend 2</h3>
                <button>Visit</button>
              </div>
              {/* Friend */}
              <div className="profile-friend-listed">
                <img src={logo} alt="placeholder" />
                <h3>friend 3</h3>
                <button>Visit</button>
              </div>
              {/* All Friends */}
              <button>All Friends</button>
            </div>
          </div>
      </section>
    );
  }

  return (
    <section className='profile-main-section'>
      {!showLogin ? (<SignUpForm onShowLogin={handleShowLogin} />) : (<LoginForm onShowSignUp={handleShowSignUp} />)}
    </section>
  );
}
  
export default Profile;