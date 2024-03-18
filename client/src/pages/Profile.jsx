import '../assets/css/profile.css';
import SignUpForm from '../components/SignUpForm';

// Will remove
const isAuthenticated = true;

function Profile() {
    return (
      <section className='profile-main-section'>
        {isAuthenticated && <SignUpForm />}
      </section>
    );
}
  
export default Profile;