import '../assets/css/social.css';

// import FriendSearch from '../components/FriendSearch';
import FriendRequest from '../components/social/FriendRequest';
import FriendList from '../components/social/FriendList';
import FriendSuggestion from '../components/social/FriendSuggestion';
import UserReviews from '../components/social/UserReviews';

import profilePic from '../assets/images/png/icons8-male-user-16.png';

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
    },
    {
      id: 2,
      username: 'Bonnie',
      profilePictureUrl: profilePic,
    },
    {
      id: 3,
      username: 'Josh',
      profilePictureUrl: profilePic,
    },
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
  //// Keep track of friend requests sent, incoming friend requests, friends on friend list, all user reviews
  //// Need function to get user context

  return (
    <div className="social-container social-flex social-flex-col">
      {/* <FriendSearch friendRequests={friendRequests} /> */}

      <FriendRequest friendRequests={friendRequests} />

      <FriendList friendRequests={friendRequests} />

      <FriendSuggestion friendRequests={friendRequests} />

      <UserReviews gameReviews={gameReviews} />
    </div>
  )
}

export default Social