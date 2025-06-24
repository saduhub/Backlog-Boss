import { useState, useEffect } from 'react';
import { Navigate } from "react-router-dom";
import Auth from "../utils/auth";
import { Link } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import FilterBar from '../components/FilterBar';
import ErrorFallbackServer from '../components/ErrorFallbackServer';
import Footer from '../components/Footer';
import '../assets/css/searchPage.css';

const GET_GAMES = gql`
  query GetGames {
    games {
      _id
      title
      averageRating
      releaseDate
      pictureUrl
    }
  }
`;

const SearchPage = () => {
  const isAuth = Auth.loggedIn();
  const { loading, error, data } = useQuery(GET_GAMES);
  const [filteredGames, setFilteredGames] = useState([]);

  useEffect(() => {
    if (data) {
      setFilteredGames(data.games);
    }
  }, [data]);

  const handleFilterSelect = (filter) => {
    let sortedGames;
    switch (filter) {
      case 'Alphabetical':
        sortedGames = [...data.games].sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'Rating':
        sortedGames = [...data.games].sort((a, b) => b.averageRating - a.averageRating);
        break;
      case 'Release Date':
        sortedGames = [...data.games].sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));
        break;
      default:
        sortedGames = [...data.games];
    }
    setFilteredGames(sortedGames);
  };
  if (!isAuth) return <Navigate to="/login" replace />;
  if (loading) return <p>Loading...</p>;
  
  if (error) {
    return (
      <ErrorFallbackServer
        error="Server-side error"
        retry={() => window.location.reload()}
        fullPage={true}
      />
    );
  }

  return (
    <div className="search-page">
      <FilterBar onFilterSelect={handleFilterSelect} />
      <div className="display-area">
        {filteredGames.map(game => (
          <Link key={game._id} to={`/game/${game._id}`} className="game-card">
            <img src={game.pictureUrl} alt={game.title} />
            <div className="game-card-details">
            <div className="game-card-title">{game.title}</div>
            <div className="game-card-rating">Rating: {game.averageRating}</div>
            <div className="game-card-release">Released: {game.releaseDate}</div>
            </div>
          </Link>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default SearchPage;
