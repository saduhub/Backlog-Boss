import { Link } from 'react-router-dom';
import './notfound.css';

const NotFound = () => (
  <section className="notfound-section">
    <h2 className="notfound-h2">404 - Page Not Found</h2>
    <p className="notfound-p">This page doesn't exist.</p>
    <Link to="/home" className="notfouns-back-home-link">Back to Home</Link>
  </section>
);

export default NotFound;