// eslint-disable-next-line
function GameStats({logo, otherData}) {
    return (
      <div className="profile-games">
        <h2>Game Stats</h2>
        <div className="profile-game-stats">
          {/* Completed Games */}
          <div className="profile-completed-games profile-stat-card">
            <div className='profile-completed-image'>
              <img src={logo} alt="placeholder" />
            </div>
            <h3>Games</h3>
            <h3>Completed</h3>
            {/* eslint-disable-next-line */}
            <h3 className='profile-highlighted-text'>{otherData.gamesCompleted.length}</h3>
          </div>
          {/* User Score */}
          <div className="profile-score-games profile-stat-card">
            <div className='profile-score-image'>
              <img src={logo} alt="placeholder" />
            </div>
            <h3>User</h3>
            <h3>Score</h3>
            {/* eslint-disable-next-line */}
            <h3 className='profile-highlighted-text'>{otherData.gamesCompleted.length*100+otherData.gamesInProgress.length*50+otherData.games100Completed.length*200}</h3>
          </div>
          {/* 100% Completion  */}
          <div className="profile-onehundred-games profile-stat-card">
            <div className='profile-onehundred-image'>
              <img src={logo} alt="placeholder" />
            </div>
            <h3>100%</h3>
            <h3>Completed</h3>
            {/* eslint-disable-next-line */}
            <h3 className='profile-highlighted-text'>{otherData.games100Completed.length}</h3>
          </div>
        </div>
      </div>
    )
}

export default GameStats;