import { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { REMOVE_FRIEND } from '../../utils/mutations';
// eslint-disable-next-line
const FriendList = ({ friends }) => {
  const [friendList, setFriendList] = useState(friends);
  const [error, setError] = useState(null);
  const [removeFriend, { loading }] = useMutation(REMOVE_FRIEND);

  useEffect(() => {
    setFriendList(friends);
  }, [friends]);

  const handleFriendRemove = async (friendId) => {
    if (loading) return;
    setError(null);

    try {
      const { data } = await removeFriend({
        variables: { friendId },
      });

      setFriendList(data.removeFriend.friends);
    } catch (err) {
      setError('Something went wrong. Please try again.');
    }
  };
  // console.log(friends);
  const handleVisit = (friendId) => {
    // console.log(`Visiting friend: ${friendId}`);
    localStorage.setItem('_idUserVisited', friendId);
    // navigate('/ProfileOther');
    window.location = '/ProfileOther'
  };

  return (
    <div>
      <section className="social-font">
        <h3 className="social-my-p5">
          Friend List
        </h3>
        
        {error && (
          <div className="social-error-box">
            {error}
          </div>
        )}

        <div className="social-col-2">
          {friends.length === 0 ? (
            <p>Add some users!</p>
          ) : (
            // eslint-disable-next-line
            friends.map(friend => {
              return (
                <div key={friend._id} className="social-inner-box social-box-col-2 social-flex social-flex-wrap social-my-p5 social-border-radius social-content-between">
                  <div className="social-flex social-items-center">
                    <button 
                      onClick={() => handleVisit(friend._id)} 
                      className="friend-profile-button" 
                      style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
                    >
                      <img 
                        src={friend.profilePictureUrl} 
                        alt="profile pic" 
                        className="social-profile-pic"
                      />
                    </button>
                    <p>
                      {friend.username}
                    </p>
                  </div>
                  <div className="social-gap-p5">
                    <button
                      onClick={() => handleFriendRemove(friend._id)}
                      disabled={loading}
                      className="social-button"
                    >
                      {loading ? 'Removing...' : 'Remove'}
                    </button>
                  </div>
                </div>
              )
            }))
          }
        </div>
      </section>
    </div>
  )
}

export default FriendList