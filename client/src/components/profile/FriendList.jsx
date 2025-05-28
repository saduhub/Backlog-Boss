import React from 'react';
// import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
// eslint-disable-next-line
function FriendList({username, logo, otherData}) {
  // const navigate = useNavigate();
  // eslint-disable-next-line
  const { friends } = otherData;
  console.log(friends);
  const currentUsername = localStorage.getItem('username');
  // console.log(currentUsername);
  // console.log(username)
  // eslint-disable-next-line
  const randomFriends = [...friends]
    .filter(friend => friend.username !== currentUsername)
    .sort(() => 0.5 - Math.random())
    .slice(0, 5);

  const handleVisit = (friendId) => {
    // console.log(`Visiting friend: ${friendId}`);
    localStorage.setItem('_idUserVisited', friendId);
    // navigate('/ProfileOther');
    window.location = '/ProfileOther'
  };

  return (
      <div className="profile-friend-list">
            {/* Friend row for each friend */}
            {/* eslint-disable-next-line */}
            {randomFriends.map(friend => (
                <div key={friend._id} className="profile-friend-listed" data-id={friend._id}>
                    <img src={friend.profilePictureUrl || logo} alt="placeholder" />
                    <h3>{friend.username}</h3>
                    <button onClick={() => handleVisit(friend._id)}>Visit</button>
                </div>
            ))}
            {/* All Friends */}
            {currentUsername == username && (
              // <button className='profile-all-friends-button'>All Friends</button>
              <Link to='/Social' className='profile-all-friends-button'>All Friends</Link>
            )}
      </div>
  )
}
// Fix to named export for hot reload consistency.
export default React.memo(FriendList);