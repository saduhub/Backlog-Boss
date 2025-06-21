// Hooks
import { Outlet, useLocation } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './components/ErrorFallback';
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
      <ErrorBoundary
        FallbackComponent={(props) => (<ErrorFallback {...props} fullPage={true} />)}
        resetKeys={[location.pathname]}
      >
        {/* Main */}
        <main className="app-main-container">
          <Outlet />
        </main>
      </ErrorBoundary>  
      {/* Footer moved to individual pages */}
    </>
  )
}

export default App
