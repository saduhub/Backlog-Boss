import Auth from '../../utils/auth';
// eslint-disable-next-line
function ProfileUserCard({username, profile}) {
    const handleLogOut = () => Auth.logout();
    console.log(profile)

    return (
    <div className="profile-user">
        <img src={profile} alt="Placeholder" />
        <div className='profile-user-since-stats'>
        <div className="profile-username-since">
            <h2>{username}</h2>
            <h3>Member since 2024</h3>
            <button className='profile-logout-button' onClick={handleLogOut}>Log Out</button>
        </div>
        <div className="profile-user-stats">
            <div className="profile-user-games">
            <h3 className='profile-highlighted-text'>5</h3>
            <h3>Backlogged</h3>
            </div>
            <div className="profile-favorite-games">
            <h3 className='profile-highlighted-text'>3</h3>
            <h3>Favorites</h3>
            </div>
            <div className="profile-rated-games">
            <h3 className='profile-highlighted-text'>45</h3>
            <h3>Played</h3>
            </div>
        </div>
        </div>
    </div>
    )
}

export default ProfileUserCard;