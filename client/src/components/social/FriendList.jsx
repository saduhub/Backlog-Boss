import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { REMOVE_FRIEND } from '../../utils/mutations';
// eslint-disable-next-line
const FriendList = ({ friends, refetchSocial }) => {
  // State
  const [removeFriend, { loading }] = useMutation(REMOVE_FRIEND);
  const [mutationError, setMutationError] = useState(null);
  const [mutationErrorCount, setMutationErrorCount] = useState(0);

  const handleFriendRemove = async (friendId) => {
    if (loading) return;
    try {
      await removeFriend({
        variables: { friendId },
      });
      setMutationError(null);
      setMutationErrorCount(0);
      try {
        await refetchSocial();
      } catch (refetchError) {
        // console.error('Refetch failed:', refetchError);
        setMutationErrorCount((prev) => prev + 1);
        setMutationError('Friend removed, but we had trouble updating your list.');
      }
      } catch (err) {
      setMutationErrorCount((prev) => prev + 1);
      setMutationError('Failed to remove friend. Please try again.');
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
        {/* Error banner below can be used if the error message is to be displayed inside of component */}
        {/* {mutationError && (
          <div className="social-error-box">
            {mutationError}
          </div>
        )} */}
        {mutationError && (
          <div className="game-mutation-error-banner">
            <span>
            {mutationError}
            {mutationErrorCount >= 2 && <span> ({mutationErrorCount})</span>}
            </span>
            <button
              onClick={() => {
                setMutationError(null);
                setMutationErrorCount(0);
              }}
              className="game-close-error-button"
              aria-label="Dismiss error"
            >
              X
            </button>
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
                        src={friend.profilePictureUrl || "https://res.cloudinary.com/dx7bgdfut/image/upload/v1749059019/BacklogBoss/user-uploads/user_jogcpd.svg"} 
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