import { Navigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { ME_LIBRARY } from "../utils/queries";
import Auth from '../utils/auth';
// Style
import '../assets/css/library.css';
import userIcon from '../assets/images/svg/user.svg';
// Components
import SortingBanner from '../components/library/SortingBanner';
import ProfileUserCard from '../components/profile/ProfileUserCard';

function Library() {
  const isAuthenticated = Auth.loggedIn();  
  const { data, loading, error } = useQuery(ME_LIBRARY, { skip: !isAuthenticated }); 
  console.log(data);
  
  if (!isAuthenticated) return <Navigate to="/login" replace={true} />
  if (loading) return <p>Loading ...</p>
  if (error) return <p className="p-8 text-red-600">Something Went Wrong</p>;
  
  const userData = data?.me || {}
  console.log(userData);

  const {
    games100Completed,
    gamesCompleted,
    gamesInBacklog,
    gamesInFavorites,
    gamesInProgress,
  } = userData;
  console.log(games100Completed);

  return (
    <section className="library-main-section">
      <h2 className="library-header">My Library</h2>
      <SortingBanner onehundred={games100Completed} completed={gamesCompleted} backlog={gamesInBacklog} favorites={gamesInFavorites} inprogress={gamesInProgress}/>
    </section>
  );
}
  
export default Library;