// Hooks
import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom';
// Styles
import '../assets/css/navbar.css'
// Images
import favicon from '../assets/images/svg/backlogbossfaviconwhite.svg'
import logo from '../assets/images/svg/backlogbosslogowhite.svg'

function loadFavicon() {
  const link = document.querySelector("link[rel~='icon']");
  if (link) {
    link.href = favicon;
  }
}

function loadBoxicons() {
  const link = document.createElement('link');
  link.href = 'https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css';
  link.rel = 'stylesheet';
  document.head.appendChild(link);
}

function App() {
  const location = useLocation();
  // Add Link to head after component mounts with useEffect hook (side effect).  
  useEffect(() => {
    loadFavicon();
    loadBoxicons();
  }, []);

  return (
    <>
      {/* Header */}
      <header className='navbar-header-section'>
        <Link to='/' className='navbar-logo'>
          <img src={logo} alt='BacklogBoss Logo' className='navbar-logo' />
        </Link>
        {/* Nav Bar */}
        <nav className='navbar-navbar'>
          <div className='navbar-container-menu-items'>
            <Link to='/profile' style={{ color: location.pathname === '/profile' ? '#9F34FF' : '#ffffff','--item': '0' }}>
              <i className='bx bxs-user'></i>
            </Link>
            <Link to='/home' style={{ color: location.pathname === '/home' ? '#9F34FF' : '#ffffff','--item': '0' }}>
              <i className='bx bxs-home'></i>
            </Link>
            <Link to='/social' style={{ color: location.pathname === '/social' ? '#9F34FF' : '#ffffff','--item': '0' }}>
              <i className='bx bxs-group'></i>
            </Link>
            <Link to='/library' style={{ color: location.pathname === '/library' ? '#9F34FF' : '#ffffff','--item': '0' }}>
              <i className='bx bx-library'></i>
            </Link>
            <Link to='/search' style={{ color: location.pathname === '/search' ? '#9F34FF' : '#ffffff','--item': '0' }}>
              <i className='bx bx-search'></i>
            </Link>
            <Link to='/ArtGen' style={{ color: location.pathname === '/create' ? '#9F34FF' : '#ffffff','--item': '0' }}>
              <i className='bx bxs-palette'></i>
            </Link>
          </div>
        </nav>
      </header>
    </>
  )
}

export default App