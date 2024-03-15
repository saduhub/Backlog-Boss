// Hooks
import { Outlet } from 'react-router-dom';
// import { useState } from 'react'
// Images
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// Styles
import './assets/css/App.css'
// Components
import Navbar from './components/Navbar';
// import Footer from './components/Footer';

function App() {
  return (
    <>
      {/* Nav Bar */}
      <Navbar/>
      {/* Main */}
      <main className="app-main-container">
        <Outlet />
      </main>
      {/* Footer */}
      {/* <Footer /> */}
    </>
  )
}

export default App
