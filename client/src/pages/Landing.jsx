import '../assets/css/landing.css';
import testAsset from '../assets/images/svg/backlogbosslogowhite.svg';
import { Link } from 'react-router-dom';

function Landing() {
    return (
      <section className='landing-main-section'>
          <div className='landing-greeting'>
              <div className="landing-image-container">
                <img src={testAsset} alt='Test Asset' className='landing-image' />
              </div>
              <div className="landing-page-elements">
                <h2>BacklogBoss</h2>
                <h4>Discover new titles, rate games, manage your backlog, document your gaming journey & connect with friends who share your passion.</h4>
                <Link to='/home' className='landing-anchor-to-home'>Get Started!</Link>
              </div>
          </div>
      </section>
    );
}
  
export default Landing;