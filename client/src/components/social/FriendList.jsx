// eslint-disable-next-line
const FriendList = ({ friends }) => {
  const handleFriendRemove = () => {
    
  }
  console.log(friends);

  return (
    <div>
      <section className="social-font">
        <h3 className="social-my-p5">
          Friend List
        </h3>

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
                    <button onClick={handleFriendRemove} className="social-button social-border-radius social-font">
                      Remove
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