// eslint-disable-next-line
function FriendList({logo, otherData}) {
    return (
        <div className="profile-friend-list">
              {/* Friend */}
              <div className="profile-friend-listed">
                <img src={logo} alt="placeholder" />
                <h3>friend 1</h3>
                <button>Visit</button>
              </div>
              {/* Friend */}
              <div className="profile-friend-listed">
                <img src={logo} alt="placeholder" />
                <h3>friend 2</h3>
                <button>Visit</button>
              </div>
              {/* Friend */}
              <div className="profile-friend-listed">
                <img src={logo} alt="placeholder" />
                <h3>friend 3</h3>
                <button>Visit</button>
              </div>
              {/* Friend */}
              <div className="profile-friend-listed">
                <img src={logo} alt="placeholder" />
                <h3>friend 4</h3>
                <button>Visit</button>
              </div>
              {/* Friend */}
              <div className="profile-friend-listed">
                <img src={logo} alt="placeholder" />
                <h3>friend 5</h3>
                <button>Visit</button>
              </div>
              {/* All Friends */}
              <button className='profile-all-friends-button'>All Friends</button>
        </div>
    )
}

export default FriendList;