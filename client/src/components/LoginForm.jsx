import { useState } from 'react';
import '../assets/css/loginForm.css'
import { useMutation } from "@apollo/client";
import Auth from "../utils/auth";
import { LOGIN_USER } from "../utils/mutations";
// eslint-disable-next-line
function LoginForm({onShowSignUp}) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [visible, setVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const [loginUser] = useMutation(LOGIN_USER, {
        onError: (error) => {
            setErrorMessage(error.message);
            setVisible(true);
        },
        onCompleted: (data) => {
            const email = data.login.user.email;
            const username = data.login.user.username;
            const _id = data.login.user._id;
            const token = data.login.token;
            Auth.login(email, username, _id, token);
        }
    });

    const handleFormSubmit = async (e) => {
        e.preventDefault();
    
        if (!username || !password) {
          setErrorMessage('All Fields Required');
          setVisible(true);
          return;
        }

        try {
            await loginUser({
                variables: { username, password }
            })
            setUsername('');
            setPassword('');
            setErrorMessage('');
            setVisible(false);
        } catch (e) {
            // console.error(e);
        }
    };

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
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
                    <input type="text" name="email" id="email" value={username} onChange={handleUsernameChange} />
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