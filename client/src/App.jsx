// Hooks
import { Outlet, useLocation } from 'react-router-dom';
// Styles
import './assets/css/App.css'
// Components
import Navbar from './components/Navbar';

function App() {
  const location = useLocation();
  return (
    <>
      {/* Nav Bar */}
      {location.pathname != '/' && <Navbar/>}
      {/* Main */}
      <main className="app-main-container">
        <Outlet />
      </main>
      {/* Footer moved to individual pages */}
    </>
  )
}

export default App
