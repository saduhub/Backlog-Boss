const FriendList = ({ friendRequests }) => {
  const handleFriendRemove = () => {
    
  }

  return (
    <div>
      <section className="social-font">
        <h3 className="social-my-p5">
          Friend List
        </h3>

        <div className="social-col-2">
          {friendRequests &&
            friendRequests.map(req => {
              return (
                <div key={req.id} className="social-inner-box social-box-col-2 social-flex social-flex-wrap social-my-p5 social-border-radius social-content-between">
                  <div className="social-flex social-items-center">
                    <img src={req.profilePictureUrl} alt="profile pic" className="social-profile-pic" />
                    <p>
                      {req.username}
                    </p>
                  </div>
                  <div className="social-gap-p5">
                    <button onClick={handleFriendRemove} className="social-button social-border-radius social-font">
                      Remove Friend
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