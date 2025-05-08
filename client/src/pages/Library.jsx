import { Navigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { ME_LIBRARY } from "../utils/queries";
// Style
import '../assets/css/library.css';
// Components
import LibraryGameCard from '../components/library/LibraryGameCard';
import SortingBanner from '../components/library/SortingBanner';
import Auth from '../utils/auth';

function Library() {
  const isAuthenticated = Auth.loggedIn();  
  const { data, loading, error } = useQuery(ME_LIBRARY, { skip: !isAuthenticated }); 
  if (!isAuthenticated) return <Navigate to="/login" replace={true} />
  if (loading) return <p>Loading Latest Reviews...</p>
  console.log(data);
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
  // const user = Auth.getUser();
  // console.log(user)

  if (loading) return <p>Loading Latest Reviews...</p>
  if (error) return <p className="p-8 text-red-600">Something Went Wrong</p>;

  return (
    <section className="library-main-section">
      <SortingBanner />
      <div className='library-main-div'>
        {
          games100Completed.map((game) => (
            <LibraryGameCard key={game._id} gameInfo={game} />
          ))
        }
      </div>
    </section>
  );
}
  
export default Library;