import { useState } from 'react';
import '../assets/css/profile.css';
import SignUpForm from '../components/SignUpForm';
import LoginForm from '../components/LoginForm';

function Profile() {
  const [showLogin, setShowLogin] = useState(false);
  // Will remove
  const isAuthenticated = false;
  const handleShowLogin = () => setShowLogin(true);
  const handleShowSignUp = () => setShowLogin(false);

  if (isAuthenticated) {
    return (
      <section className='profile-main-section'>
          <h1>Hello</h1>
      </section>
    );
  }

  return (
    <section className='profile-main-section'>
      {!showLogin ? (<SignUpForm onShowLogin={handleShowLogin} />) : (<LoginForm onShowSignUp={handleShowSignUp} />)}
    </section>
  );
}
  
export default Profile;