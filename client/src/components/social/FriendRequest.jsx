import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_FRIEND, REJECT_FRIEND } from '../../utils/mutations';
import { SOCIAL } from '../../utils/queries';
// eslint-disable-next-line
const FriendRequest = ({ friendRequests }) => {
  const [addFriend, { loading: adding }] = useMutation(ADD_FRIEND, {
    refetchQueries: [{ query: SOCIAL }],
    awaitRefetchQueries: true,
  });
  const [rejectFriend, { loading: rejecting }] = useMutation(REJECT_FRIEND);
  const [requests, setRequests] = useState(friendRequests);
  const myId = localStorage.getItem('_id');
  // console.log(myId)
  const [error, setError] = useState(null);
  const handleFriendAccept = (userId) => {
    // console.log(userId);
    if (adding) return;
    setError(null);
    addFriend({
      variables: {userId: userId, myId: myId}
    }).then((response) => {
      // console.log(`User added to friends and removed from requests. Response:${response}`)
      const updatedFriendRequests = requests.filter(request => request._id !==userId);
      setRequests(updatedFriendRequests);
    }).catch (error => {
      // console.error(error, userId)
      setError('Something went wrong. Please try again.');
    });
  }

  const handleFriendDecline = (userId) => {
    console.log(userId);
    if (rejecting) return;
    setError(null);
    rejectFriend({
      variables: {userId: userId, myId: myId}
    }).then((response) => {
      // console.log(`User removed from requests. Response:${response}`)
      const updatedFriendRequests = requests.filter(request => request._id !==userId);
      setRequests(updatedFriendRequests);
    }).catch (error => {
      // console.error(error, userId)
      setError('Something went wrong. Please try again.');
    });
  }

  return (
    <div>
      <section className="social-font">
        <h3 className="social-my-p5">
          Friend Requests
        </h3>

        {error && (
          <div className="social-error-box">
            {error}
          </div>
        )}

        <div className='social-friend-requests'>
          {requests.length === 0 ? (
            <p>No friend requests at the moment</p>
          ) : (
            requests.map(request => {
              return (
                <div key={request._id} className="social-inner-box social-my-p5 social-flex social-flex-wrap social-content-between social-border-radius">
                  <div className="social-flex social-items-cente social-image-name-div">
                    <img src={request.profilePictureUrl} alt="profile pic" className="social-profile-pic" />
                    <p>
                      {request.username}
                    </p>
                  </div>
                  <div className="social-flex social-gap-p5">
                    <button onClick={() => handleFriendAccept(request._id)} className="social-button social-font social-border-radius">
                      Accept
                    </button>
                    <button onClick={() =>handleFriendDecline(request._id)} className="social-button social-font social-border-radius">
                      Decline
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

export default FriendRequest