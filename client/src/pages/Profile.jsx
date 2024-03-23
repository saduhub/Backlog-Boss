import { useState, useEffect } from 'react';
import '../assets/css/profile.css';
import logo from '../assets/images/svg/backlogbosslogowhite.svg'
import SignUpForm from '../components/SignUpForm';
import LoginForm from '../components/LoginForm';
import ProfileUserCard from '../components/profile/ProfileUserCard';
import GameSuggestions from '../components/profile/GameSuggestions';
import Auth from '../utils/auth';
import { useQuery } from "@apollo/client";
import { ME } from "../utils/queries";

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
            < ProfileUserCard username={meData.username} profile={meData.profilePictureUrl} />
              {/* Game Stats */}
              <div className="profile-games">
                <h2>Game Stats</h2>
                <div className="profile-game-stats">
                  {/* Completed Games */}
                  <div className="profile-completed-games profile-stat-card">
                    <div className='profile-completed-image'>
                      <img src={logo} alt="placeholder" />
                    </div>
                    <h3>Games</h3>
                    <h3>Completed</h3>
                    <h3 className='profile-highlighted-text'>5</h3>
                  </div>
                  {/* User Score */}
                  <div className="profile-score-games profile-stat-card">
                    <div className='profile-score-image'>
                      <img src={logo} alt="placeholder" />
                    </div>
                    <h3>User</h3>
                    <h3>Score</h3>
                    <h3 className='profile-highlighted-text'>500</h3>
                  </div>
                  {/* 100% Completion  */}
                  <div className="profile-onehundred-games profile-stat-card">
                    <div className='profile-onehundred-image'>
                      <img src={logo} alt="placeholder" />
                    </div>
                    <h3>100%</h3>
                    <h3>Completed</h3>
                    <h3 className='profile-highlighted-text'>8</h3>
                  </div>
                </div>
              </div>
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
            < GameSuggestions />
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