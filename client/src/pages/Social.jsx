import { useState, useEffect } from 'react';
import { useQuery } from "@apollo/client";
import { SOCIAL } from '../utils/queries';
import { Navigate } from "react-router-dom";
import '../assets/css/social.css';
// import FriendSearch from '../components/FriendSearch';
import FriendRequest from '../components/social/FriendRequest';
import FriendList from '../components/social/FriendList';
import FriendSuggestion from '../components/social/FriendSuggestion';
import UserReviews from '../components/social/UserReviews';
import Footer from '../components/Footer';
// import profilePic from '../assets/images/png/icons8-male-user-16.png';
import Auth from '../utils/auth';

const Social = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const { data, loading, error } = useQuery(SOCIAL);
  // console.log(error);
  const meData = data?.me || {}
  // console.log(meData);
  const usersData = data?.users || {}
  // console.log(usersData);

  useEffect(() => {
    setIsAuthenticated(Auth.loggedIn());
  }, []);

  if (loading) return <p>Loading...</p>

  const friendRequestData = meData.friendRequests;
  // console.log(friendRequestData);
  const friendsData = meData.friends;
  // console.log(friendsData);
  let gameReviews = meData.reviews;
  // console.log(gameReviews);

  if (isAuthenticated) {
    return (
      <>
        <div className="social-container social-flex social-flex-col">
          {/* <FriendSearch friendRequests={friendRequests} /> */}

          <FriendRequest friendRequests={friendRequestData} />

          <FriendList friends={friendsData} />

          <FriendSuggestion friendSuggestions={usersData} friends={friendsData} />

          <UserReviews gameReviews={gameReviews} username={meData.username} profile={meData.profilePictureUrl} />
        </div>
        <Footer />
      </>
    )
  }

  return (
    <Navigate to="/login" replace={true} />
  );
}

export default Social