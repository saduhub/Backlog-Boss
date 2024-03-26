import { useMutation } from '@apollo/client';
import { ADD_FRIEND } from '../../utils/mutations';

const FriendRequest = ({ friendRequests }) => {
  const { data } = useMutation(ADD_FRIEND, {
    variables: {
      friends: friendRequests.id
    }
  });

  const handleFriendAccept = () => {

  }

  const handleFriendDecline = () => {

  }

  return (
    <div>
      <section className="social-font">
        <h3 className="social-my-p5">
          Friend Requests
        </h3>

        <div className='social-friend-requests'>
          {friendRequests &&
            // eslint-disable-next-line
            friendRequests.map(req => {
              return (
                <div key={req.id} className="social-inner-box social-my-p5 social-flex social-flex-wrap social-content-between social-border-radius">
                  <div className="social-flex social-items-cente social-image-name-div">
                    <img src={req.profilePictureUrl} alt="profile pic" className="social-profile-pic" />
                    <p>
                      {req.username}
                    </p>
                  </div>
                  <div className="social-flex social-gap-p5">
                    <button onClick={handleFriendAccept} className="social-button social-font social-border-radius">
                      Accept
                    </button>
                    <button onClick={handleFriendDecline} className="social-button social-font social-border-radius">
                      Decline
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

export default FriendRequest