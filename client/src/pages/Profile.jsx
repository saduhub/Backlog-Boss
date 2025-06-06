import { Navigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import { useQuery } from "@apollo/client";
import { ME, GET_PROFILE_BACKLOGGED_COUNT } from "../utils/queries";
// Style
import '../assets/css/profile.css';
// Images
import logo from '../assets/images/svg/backlogbosslogowhite.svg'
import userIcon from '../assets/images/svg/user.svg'
// Components
// import SignUpForm from '../components/SignUpForm';
// import LoginForm from '../components/LoginForm';
import ProfileUserCard from '../components/profile/ProfileUserCard';
import GameStats from '../components/profile/GameStats';
import Challenges from '../components/profile/Challenges';
import ChallengesDesktop from '../components/profile/ChallengesDesktop';
import FriendList from '../components/profile/FriendList';
import GameSuggestions from '../components/profile/GameSuggestions';
// Utilities
import Auth from '../utils/auth';

function Profile() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  // eslint-disable-next-line
  const { data, loading, error } = useQuery(ME);
  const { data: countData } = useQuery(GET_PROFILE_BACKLOGGED_COUNT);
  // console.log(error);
  const meData = data?.me || {}
  // console.log(meData);

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
              backloggedCount={countData?.profileBackloggedCount || 0}
              otherData={meData} 
            />
            {/* Game Stats */}
            < GameStats 
              otherData={meData} 
              logo={logo}
            />
            {/* Challenges Mobile */}
            <Challenges
              otherData={meData} 
              logo={logo}
              username={meData.username}
             />  
          </div>
          <div className='profile-suggestions-friends'>
            {/* Game Suggestions */}
            <h2>Game Suggestions</h2>
            < GameSuggestions 
              gamesInBacklog={meData.gamesInBacklog.map(game => game._id)}
              username={meData.username}
            />
            {/* Friends */}
            <h2>Friend List</h2>
            <FriendList
              otherData={meData} 
              logo={logo}
              username={meData.username}
            /> 
            {/* Challenges Desktop */}
            <ChallengesDesktop
              otherData={meData} 
              logo={logo}
              username={meData.username}
            /> 
          </div>
      </section>
    );
  }

  return (
    <Navigate to="/login" replace={true} />
  );
}
  
export default Profile;