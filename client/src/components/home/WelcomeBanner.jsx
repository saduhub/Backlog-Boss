import './welcome-banner.css'

function WelcomeBanner({ user }) {
    if (user) {

      const {
          username,
          _id,
      } = user;

      return (
        <div className="home-welcome-banner">
          <h2>Hello, <span>{username}</span> 👋</h2>
          <p>Check out the latest game reviews below!</p>
        </div>
      );
    }
  
    return (
      <div className="home-welcome-banner">
        <h2>Hello, welcome to BacklogBoss!</h2>
        <p>
        Check out the latest game reviews below! Consider <a href="/login">signing up</a> or <a href="/login">logging in</a> to use all the features.
        </p>
      </div>
    );
  }
  
export default WelcomeBanner;