// import { useState, useEffect } from 'react';
import { useQuery } from "@apollo/client";
import { USER_VISITED_INFO } from "../utils/queries";
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
// import Auth from '../utils/auth';

function Profile() {
    //   const [showLogin, setShowLogin] = useState(false);
    //   const [isAuthenticated, setIsAuthenticated] = useState(false);
    //   const handleShowLogin = () => setShowLogin(true);
    //   const handleShowSignUp = () => setShowLogin(false);
    const userVisitedId = localStorage.getItem('_idUserVisited');
    //   const userVisitedId = "660086a8868c8a1873a78541";
    // eslint-disable-next-line
    const { data, loading, error } = useQuery(USER_VISITED_INFO, {
        variables: {id: userVisitedId}
    });
    //   console.log(error);
    const userVisitedData = data?.userVisitedInfo || {}
    //   console.log(userVisitedData);
    if (loading) return <p>Loading...</p>

    return (
      <section className='profile-main-section'>
          {/* User Card, Game Stats, Challenges */}
          <div className='profile-user-stats-challenges'>
            {/* User Card */}
            < ProfileUserCard 
              username={userVisitedData.username} 
              profile={userVisitedData.profilePictureUrl ? userVisitedData.profilePictureUrl : userIcon}
              otherData={userVisitedData} 
            />
            {/* Game Stats */}
            < GameStats 
              otherData={userVisitedData} 
              logo={logo}
            />
            {/* Challenges Mobile */}
            <Challenges
              otherData={userVisitedData} 
              logo={logo}
              username={userVisitedData.username}
             />  
          </div>
          <div className='profile-suggestions-friends'>
            {/* Game Suggestions */}
            <h2>Game Suggestions</h2>
            < GameSuggestions 
                gamesInBacklog={userVisitedData.gamesInBacklog.map(game => game._id)} 
                username={userVisitedData.username}
            />
            {/* Friends */}
            <h2>Friend List</h2>
            <FriendList
              otherData={userVisitedData} 
              logo={logo}
              username={userVisitedData.username}
            /> 
            {/* Challenges Desktop */}
            <ChallengesDesktop
              otherData={userVisitedData} 
              logo={logo}
              username={userVisitedData.username}
            /> 
          </div>
      </section>
    );
}
  
export default Profile;