import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// Components
import App from './App.jsx'
import Home from './pages/Home';
import Landing from './pages/Landing';
import Game from './pages/Game';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Landing /> },
      { path: 'Home', element: <Home /> },
      { path: 'Game', element: <Game /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)