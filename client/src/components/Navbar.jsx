// Hooks
import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom';
// Styles
import '../assets/css/navbar.css'
// Images
import favicon from '../assets/images/svg/backlogBossIcon.svg'

function loadFavicon() {
  const link = document.querySelector("link[rel~='icon']");
  if (link) {
    link.href = favicon;
  }
}

function App() {
  const location = useLocation();
  // Add Link to head after component mounts with useEffect hook (side effect).  
  useEffect(() => {
    loadFavicon();
  }, []);

  return (
    <>
      {/* Header */}
      <header className="navbar-header-section">
        <Link to="/" className="navbar-logo">BB</Link>
        {/* Nav Bar */}
        <nav className="navbar-navbar">
          <div className="navbar-container-menu-items">
            <Link to="/home" style={{ color: location.pathname === '/home' ? '#9F34FF' : '#ffffff','--item': '0' }}>Home</Link>
            <Link to="/game" style={{ color: location.pathname === '/game' ? '#9F34FF' : '#ffffff','--item': '0' }}>Game</Link>
            <Link to="/search" style={{ color: location.pathname === '/search' ? '#9F34FF' : '#ffffff','--item': '0' }}>Search</Link>
          </div>
        </nav>
      </header>
    </>
  )
}

export default App