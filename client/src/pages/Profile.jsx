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
import Footer from "../components/Footer";
import ErrorFallbackServer from '../components/ErrorFallbackServer';
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

  // Server-side error. Instead of wrapping individual components in ErrorBoundaries, I chose to handle query errors here at the page level.This is because the components themselves don't make their own queries. They rely entirely on data passed down from this parent. If the query fails, there's no point rendering the child components at all. 
  // Note: I'm not explicitly handling `error` from GET_PROFILE_BACKLOGGED_COUNT because its value is non-critical. If it fails, the fallback value of 0 ensures the app still renders safely: backloggedCount={countData?.profileBackloggedCount || 0}
  if (error) {
    return (
      <ErrorFallbackServer
        error="Server-side error"
        retry={() => window.location.reload()}
        fullPage={true}
      />
    );
  }

  if (isAuthenticated) {
    return (
      <>
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
        <Footer />
      </>
    );
  }

  return (
    <Navigate to="/login" replace={true} />
  );
}
  
export default Profile;