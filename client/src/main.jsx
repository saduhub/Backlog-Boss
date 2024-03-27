import {ApolloClient, ApolloProvider, InMemoryCache, createHttpLink} from '@apollo/client' 
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// Components
import App from './App.jsx'
import { setContext } from '@apollo/client/link/context'
import Profile from './pages/Profile';
import ProfileOther from './pages/ProfileOther';
import Home from './pages/Home';
import Landing from './pages/Landing';
import Game from './pages/Game';
import SearchPage from './pages/SearchPage';
import ArtGen from './pages/ArtGen';
import Social from './pages/Social';
import Library from './pages/Library.jsx';
import Login from './pages/Login.jsx';
const httpLink = createHttpLink({
  uri: "/graphql"

})
const authLink = setContext((_, {headers}) => {
  const token = localStorage.getItem("id_token")
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
}})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
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
      { path: 'ProfileOther', element: <ProfileOther /> },
      { path: 'login', element: <Login /> },
      { path: 'Library', element: <Library /> }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <ApolloProvider client = {client}><RouterProvider router={router} /></ApolloProvider>
)