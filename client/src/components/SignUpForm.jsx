import { useState } from 'react';
import '../assets/css/signUpForm.css'
import { useMutation } from "@apollo/client";
import Auth from "../utils/auth";
import { ADD_USER } from "../utils/mutations";
// eslint-disable-next-line
function SignUpForm({ onShowLogin }) {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [visible, setVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const [addUser] = useMutation(ADD_USER, {
    onError: (error) => {
        setErrorMessage(error.message);
        setVisible(true);
    },
    onCompleted: (data) => {
        const email = data.addUser.user.email;
        const username = data.addUser.user.username;
        const _id = data.addUser.user._id;
        const token = data.addUser.token;
        Auth.login(email, username, _id, token);
    }
    });

    const handleFormSubmit = async (e) => {
        e.preventDefault();
    
        if (!email || !username || !password) {
          setErrorMessage('All Fields Required');
          setVisible(true);
          return;
        }

        try {
            await addUser({
                variables: { email, username, password }
            })
            setUsername('');
            setEmail('');
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
            <div className="signupform-container">
                <h2 className="signupform-signup-header">Sign Up</h2>
                <h3 className="signupform-signup-sub-header">Join the gaming community by providing your details!</h3>
                <form action="submit" className="signupform-signup-form" onSubmit={handleFormSubmit}>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" value={email} onChange={handleEmailChange} />
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" id="username" value={username} onChange={handleUsernameChange} />
                    <label htmlFor="password">Set up Password</label>
                    <input type="password" name="password" id="password" value={password} onChange={handlePasswordChange} />
                    <button type="submit">Join</button>
                </form>
                <h4 className='signup-link-to-login'>
                    Already a member?
                    <span onClick={onShowLogin}>
                        Log in
                    </span>
                </h4>
                {visible && (
                    <div className="signupform-modal">
                        <div className="signupform-modal-content">
                            <p>{errorMessage}</p>
                            <span className="signupform-close-button" onClick={closeModal}>x</span>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
  
export default SignUpForm;