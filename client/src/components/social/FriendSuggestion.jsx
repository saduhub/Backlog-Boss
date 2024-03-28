// eslint-disable-next-line
const FriendSuggestion = ({ friendSuggestions, friends }) => {
  const currentUserId = localStorage.getItem('_id');
  const getFilteredSuggestions = () => {
    // To avoid errors in the case that the user has no friends or friendSuggestions is empty
    if (!friendSuggestions || !friends) return [];
    // eslint-disable-next-line
    return friendSuggestions.filter(suggestion =>
      // eslint-disable-next-line
      !friends.some(friend => friend._id === suggestion._id) &&
      suggestion._id !== currentUserId
    );
  };

  const handleFriendAdd = () => {
    
  };

  const filteredSuggestions = getFilteredSuggestions(); 

  return (
    <div>
      <section className="social-font">
        <h3 className="social-my-p5">Suggested Friends</h3>
        <div className="social-col-2 social-suggested-friends">
          {filteredSuggestions.length > 0 ? (
            filteredSuggestions.map(suggestion => (
              <div key={suggestion._id} className="social-inner-box social-box-col-2 social-flex social-flex-wrap social-my-p5 social-border-radius social-content-between">
                <div className="social-flex social-items-center">
                  <img src={suggestion.profilePictureUrl} alt="Profile Picture" className="social-profile-pic" />
                  <p>{suggestion.username}</p>
                </div>
                <div className="social-flex social-gap-p5">
                  <button onClick={handleFriendAdd} className="social-button social-font social-border-radius">Add</button>
                </div>
              </div>
            ))
            ) : (<p>No new friend suggestions available.</p>)
          }
        </div>
      </section>
    </div>
  );
};

export default FriendSuggestion;