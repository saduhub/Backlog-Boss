import Auth from '../../utils/auth';
// eslint-disable-next-line
function ProfileUserCard({username, profile, backloggedCount = 0, otherData}) {
    const handleLogOut = () => Auth.logout();
    // console.log(profile)
    const currentUsername = localStorage.getItem('username');

    return (
    <div className="profile-user">
        <img src={profile} alt="Placeholder" />
        <div className='profile-user-since-stats'>
        <div className="profile-username-since">
            <h2>{username}</h2>
            <h3>Member since 2024</h3>
            {currentUsername === username && (
                <button className='profile-logout-button' onClick={handleLogOut}>Log Out</button>
            )}
        </div>
        <div className="profile-user-stats">
            <div className="profile-user-games">  
            {/* eslint-disable-next-line */}
            <h3 className='profile-highlighted-text'>{backloggedCount}</h3>
            <h3>Backlogged</h3>
            </div>
            <div className="profile-favorite-games">
            {/* eslint-disable-next-line */}
            <h3 className='profile-highlighted-text'>{otherData.gamesInFavorites.length}</h3>
            <h3>Favorites</h3>
            </div>
            <div className="profile-rated-games">
            {/* eslint-disable-next-line */}
            <h3 className='profile-highlighted-text'>{otherData.gamesCompleted.length + otherData.gamesInProgress.length}</h3>
            <h3>Played</h3>
            </div>
        </div>
        </div>
    </div>
    )
}

export default ProfileUserCard;