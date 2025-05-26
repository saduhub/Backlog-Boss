import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_FRIEND, REJECT_FRIEND } from '../../utils/mutations';
// eslint-disable-next-line
const FriendRequest = ({ friendRequests }) => {
  const [addFriend, { loading: adding }] = useMutation(ADD_FRIEND);
  const [rejectFriend, { loading: rejecting }] = useMutation(REJECT_FRIEND);
  const [requests, setRequests] = useState(friendRequests);
  const myId = localStorage.getItem('_id');
  console.log(myId)
  const handleFriendAccept = (userId) => {
    console.log(userId);
    if (adding) return;
    addFriend({
      variables: {userId: userId, myId: myId}
    }).then((response) => {
      console.log(`User added to friends and removed from requests. Response:${response}`)
      const updatedFriendRequests = requests.filter(request => request._id !==userId);
      setRequests(updatedFriendRequests);
    }).catch (error => {
      console.error(error, userId)
    });
  }

  const handleFriendDecline = (userId) => {
    console.log(userId);
    if (rejecting) return;
    rejectFriend({
      variables: {userId: userId, myId: myId}
    }).then((response) => {
      console.log(`User removed from requests. Response:${response}`)
      const updatedFriendRequests = requests.filter(request => request._id !==userId);
      setRequests(updatedFriendRequests);
    }).catch (error => {
      console.error(error, userId)
    });
  }

  return (
    <div>
      <section className="social-font">
        <h3 className="social-my-p5">
          Friend Requests
        </h3>

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