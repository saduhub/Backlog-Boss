import { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_FRIEND } from '../../utils/mutations';
import { SOCIAL } from '../../utils/queries';
// eslint-disable-next-line
const FriendSuggestion = ({ friendSuggestions = [], friends = [] }) => {
  // State
  const [mutationError, setMutationError] = useState(null);
  const [mutationErrorCount, setMutationErrorCount] = useState(0);
  const currentUserId = localStorage.getItem('_id');

  const [addFriend, { loading: adding }] = useMutation(ADD_FRIEND, {
    refetchQueries: [{ query: SOCIAL }],
    awaitRefetchQueries: true,
  });

  const filtered = friendSuggestions.filter(suggestion =>
    !friends.some(friend => friend._id === suggestion._id) &&
    suggestion._id !== currentUserId
  );

  const handleFriendAdd = async (userId) => {
    if (adding) return;
    try {
      await addFriend({variables: {userId: userId}})
      setMutationError(null);
      setMutationErrorCount(0);
    } catch (err) {
      // console.error(err, userId)
      setMutationErrorCount((prev) => prev + 1);
      setMutationError('Failed to add friend. Please try again.');
    }
  };

  const handleVisit = (friendId) => {
    // console.log(`Visiting friend: ${friendId}`);
    localStorage.setItem('_idUserVisited', friendId);
    // navigate('/ProfileOther');
    window.location = '/ProfileOther'
  };

  return (
    <div>
      <section className="social-font">
        <h3 className="social-my-p5">Suggested Friends</h3>
        {/* Error banner below can be used if the error message is to be displayed inside of component */}
        {/* {mutationError && <div className="social-error-box">{mutationError}</div>} */}
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
        <div className="social-col-2 social-suggested-friends">
          {filtered.length?filtered.map(suggestion => (
            <div key={suggestion._id}
                className="social-inner-box social-box-col-2 social-flex social-my-p5 social-border-radius social-content-between">
              <div className="social-flex social-items-center">
                <button 
                  onClick={() => handleVisit(suggestion._id)} 
                  className="friend-profile-button" 
                  style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
                >
                  <img src={suggestion.profilePictureUrl}
                    alt="Profile"
                    className="social-profile-pic" 
                   />
                </button>
                <p>{suggestion.username}</p>
              </div>
              <button
                onClick={() => handleFriendAdd(suggestion._id)}
                disabled={adding}
                className="social-button social-font social-border-radius">
                {adding ? 'Adding…' : 'Add'}
              </button>
            </div>
          ))
          : <p>No new friend suggestions available.</p>
          }
        </div>
      </section>
    </div>
  );
};

export default FriendSuggestion;