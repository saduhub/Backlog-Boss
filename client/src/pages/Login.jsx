import { useState } from 'react';
import '../assets/css/profile.css';

import SignUpForm from '../components/SignUpForm';
import LoginForm from '../components/LoginForm';

const Login = () => {
  const [showLogin, setLogin] = useState(false);
  const handleShowLogin = () => setLogin(!showLogin);
  return (
    <section className='profile-main-section'>
       {!showLogin ? (<SignUpForm onShowLogin={handleShowLogin} />) : (<LoginForm onShowSignUp={handleShowLogin} />)}
    </section>
  )
}

export default Login;