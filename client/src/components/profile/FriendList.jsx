import { useNavigate } from 'react-router-dom';
// eslint-disable-next-line
function FriendList({logo, otherData}) {
  const navigate = useNavigate();
  // eslint-disable-next-line
  const { friends } = otherData;
  // eslint-disable-next-line
  const randomFriends = [...friends].sort(() => 0.5 - Math.random()).slice(0, 5);

  const handleVisit = (friendId) => {
    console.log(`Visiting friend: ${friendId}`);
    localStorage.setItem('_idUserVisited', friendId);
    navigate('/ProfileOther');
  };

  return (
      <div className="profile-friend-list">
            {/* Friend row for each friend */}
            {/* eslint-disable-next-line */}
            {randomFriends.map(friend => (
                <div key={friend._id} className="profile-friend-listed" data-id={friend._id}>
                    <img src={logo} alt="placeholder" />
                    <h3>{friend.username}</h3>
                    <button onClick={() => handleVisit(friend._id)}>Visit</button>
                </div>
            ))}
            {/* All Friends */}
            <button className='profile-all-friends-button'>All Friends</button>
      </div>
  )
}

export default FriendList;