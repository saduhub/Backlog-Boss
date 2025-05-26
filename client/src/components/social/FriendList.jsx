import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { REMOVE_FRIEND } from '../../utils/mutations';
// eslint-disable-next-line
const FriendList = ({ friends }) => {
  const [friendList, setFriendList] = useState(friends);
  const [error, setError] = useState(null);
  const [removeFriend, { loading }] = useMutation(REMOVE_FRIEND);
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
          {friends &&
            // eslint-disable-next-line
            friends.map(friend => {
              return (
                <div key={friend._id} className="social-inner-box social-box-col-2 social-flex social-flex-wrap social-my-p5 social-border-radius social-content-between">
                  <div className="social-flex social-items-center">
                    <img src={friend.profilePictureUrl} alt="profile pic" className="social-profile-pic" />
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
            })
          }
        </div>
      </section>
    </div>
  )
}

export default FriendList