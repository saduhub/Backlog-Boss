import { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_FRIEND } from '../../utils/mutations';
import { SOCIAL } from '../../utils/queries';
// eslint-disable-next-line
const FriendSuggestion = ({ friendSuggestions = [], friends = [] }) => {
  const [suggestions, setSuggestions] = useState(friendSuggestions);
  const [error, setError]= useState(null);
  const currentUserId = localStorage.getItem('_id');

  useEffect(() => {
    setSuggestions(friendSuggestions);
  }, [friendSuggestions]);

  const [addFriend, { loading: adding }] = useMutation(ADD_FRIEND, {
    refetchQueries: [{ query: SOCIAL }],
    awaitRefetchQueries: true,
  });

  const filtered = suggestions.filter(suggestion =>
    !friends.some(friend => friend._id === suggestion._id) &&
    suggestion._id !== currentUserId
  );

  const handleFriendAdd = (userId) => {
    if (adding) return;
    setError(null);

    addFriend({
      variables: {userId: userId}
    }).then((response) => {
      setSuggestions(prev => prev.filter(suggestion => suggestion._id !== userId));
    }).catch (error => {
      // console.error(error, userId)
      setError('Something went wrong. Please try again.');
    });
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
        {error && <div className="social-error-box">{error}</div>}
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