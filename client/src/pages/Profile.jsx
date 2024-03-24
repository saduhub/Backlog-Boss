import { useState, useEffect } from 'react';
import { useQuery } from "@apollo/client";
import { ME } from "../utils/queries";
// Style
import '../assets/css/profile.css';
// Images
import logo from '../assets/images/svg/backlogbosslogowhite.svg'
import userIcon from '../assets/images/svg/user.svg'
// Components
import SignUpForm from '../components/SignUpForm';
import LoginForm from '../components/LoginForm';
import ProfileUserCard from '../components/profile/ProfileUserCard';
import GameStats from '../components/profile/GameStats';
import GameSuggestions from '../components/profile/GameSuggestions';
// Utilities
import Auth from '../utils/auth';

function Profile() {
  const [showLogin, setShowLogin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const handleShowLogin = () => setShowLogin(true);
  const handleShowSignUp = () => setShowLogin(false);

  const { data, loading, error } = useQuery(ME);

  console.log(error);

  const meData = data?.me || {}
  console.log(meData);

  useEffect(() => {
    setIsAuthenticated(Auth.loggedIn());
  }, []);

  if (loading) return <p>Loading...</p>

  if (isAuthenticated) {
    return (
      <section className='profile-main-section'>
          {/* User Card, Game Stats, Challenges */}
          <div className='profile-user-stats-challenges'>
            {/* User Card */}
            < ProfileUserCard 
              username={meData.username} 
              profile={meData.profilePictureUrl ? meData.profilePictureUrl : userIcon}
              otherData={meData} 
            />
            {/* Game Stats */}
            < GameStats 
              otherData={meData} 
              logo={logo}
            />
            {/* Challenges Mobile */}
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
                    <h4><span className='profile-highlighted-text'>37</span>/50</h4>
                  </div>
                  <div className='profile-progress-bar'>
                    <div className='profile-reviewed'>
                      <p>.</p>
                    </div>
                  </div>
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
                    <h3>Likes Gardnered</h3>
                    <h4><span className='profile-highlighted-text'>1</span>/200</h4>
                  </div>
                  <div className='profile-progress-bar'>
                    <div className='profile-likes'>
                      <p>.</p>
                    </div>
                  </div>
                  <h5>Popular!</h5>
                </div>
              </div>
            </div>
          </div>
          <div className='profile-suggestions-friends'>
            {/* Game Suggestions */}
            <h2>Game Suggestions</h2>
            < GameSuggestions gamesInBacklog={meData.gamesInBacklog.map(game => game._id)} />
            {/* Friends */}
            <h2>Friend List</h2>
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
              {/* Friend */}
              <div className="profile-friend-listed">
                <img src={logo} alt="placeholder" />
                <h3>friend 4</h3>
                <button>Visit</button>
              </div>
              {/* Friend */}
              <div className="profile-friend-listed">
                <img src={logo} alt="placeholder" />
                <h3>friend 5</h3>
                <button>Visit</button>
              </div>
              {/* All Friends */}
              <button className='profile-all-friends-button'>All Friends</button>
            </div>
            {/* Challenges Desktop */}
            <div className="profile-challenges-desktop">
                <h2>Challenges</h2>
                {/* Reviewed */}
                <div className="profile-games-reviewed">
                  <div className="profile-reviewed-image">
                    <img src={logo} alt="placeholder" />
                  </div>
                  <div className="profile-progress">
                    <div className="profile-title-number">
                      <h3>Games Reviewed</h3>
                      <h4><span className='profile-highlighted-text'>37</span>/50</h4>
                    </div>
                    <div className='profile-progress-bar'>
                      <div className='profile-reviewed'>
                        <p>.</p>
                      </div>
                    </div>
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
                      <h3>Likes Gardnered</h3>
                      <h4><span className='profile-highlighted-text'>1</span>/200</h4>
                    </div>
                    <div className='profile-progress-bar'>
                      <div className='profile-likes'>
                        <p>.</p>
                      </div>
                    </div>
                    <h5>Popular!</h5>
                  </div>
                </div>
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