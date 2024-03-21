import {ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client' 
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// Components
import App from './App.jsx'
import Profile from './pages/Profile';
import Home from './pages/Home';
import Landing from './pages/Landing';
import Game from './pages/Game';
import SearchPage from './pages/SearchPage';
import ArtGen from './pages/ArtGen';
import Social from './pages/Social';
const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache()
})
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Landing /> },
      { path: 'Profile', element: <Profile /> },
      { path: 'Home', element: <Home /> },
      { path: 'Game/:id', element: <Game /> },
      { path: 'ArtGen', element: <ArtGen /> },
      { path: 'Social', element: <Social /> },
      { path: 'search', element: <SearchPage /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <ApolloProvider client = {client}><RouterProvider router={router} /></ApolloProvider>
)