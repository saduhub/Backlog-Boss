import { useState } from 'react';
import '../assets/css/loginForm.css'
// eslint-disable-next-line
function LoginForm({onShowSignUp}) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [visible, setVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleFormSubmit = (e) => {
        e.preventDefault();
    
        if (!email || !password) {
          setErrorMessage('All Fields Required');
          setVisible(true);
          return;
        }

        setEmail('');
        setPassword('');
        setErrorMessage('');
        setVisible(false);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };
    
    const closeModal = () => {
        setVisible(false);
    };

    return (
        <> 
            <div className="loginform-container">
                <h2 className="loginform-login-header">Log In</h2>
                <h3 className="loginform-login-sub-header">Sign in to access your profile</h3>
                <form action="submit" className="loginform-login-form" onSubmit={handleFormSubmit}>
                    <label htmlFor="email">Enter Username</label>
                    <input type="email" name="email" id="email" value={email} onChange={handleEmailChange} />
                    <label htmlFor="password">Enter Password</label>
                    <input type="password" name="password" id="password" value={password} onChange={handlePasswordChange} />
                    <button type="submit">Log In</button>
                </form>
                <h4 className='login-link-to-signup'>
                    Already a member?
                    <span onClick={onShowSignUp}>
                        Sign Up
                    </span>
                </h4>
                {visible && (
                    <div className="loginform-modal">
                        <div className="loginform-modal-content">
                            <p>{errorMessage}</p>
                            <span className="loginform-close-button" onClick={closeModal}>x</span>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
  
export default LoginForm;