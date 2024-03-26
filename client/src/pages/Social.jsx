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
// import profilePic from '../assets/images/png/icons8-male-user-16.png';
import Auth from '../utils/auth';

const Social = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const { data, loading, error } = useQuery(SOCIAL);
  console.log(error);
  const meData = data?.me || {}
  console.log(meData);
  const usersData = data?.users || {}
  console.log(usersData);

  useEffect(() => {
    setIsAuthenticated(Auth.loggedIn());
  }, []);

  if (loading) return <p>Loading...</p>

  const friendRequestData = meData.friendRequests
  console.log(friendRequestData);
  const friendsData = meData.friends
  console.log(friendsData);

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
  //// Keep track of friend requests sent, incoming friend requests, friends on friend list, all user reviews
  //// Need function to get user context

  if (isAuthenticated) {
    return (
      <div className="social-container social-flex social-flex-col">
        {/* <FriendSearch friendRequests={friendRequests} /> */}

        <FriendRequest friendRequests={friendRequestData} />

        <FriendList friends={friendsData} />

        <FriendSuggestion friendSuggestions={usersData} friends={friendsData} />

        <UserReviews gameReviews={gameReviews} />
      </div>
    )
  }

  return (
    <Navigate to="/login" replace={true} />
  );
}

export default Social