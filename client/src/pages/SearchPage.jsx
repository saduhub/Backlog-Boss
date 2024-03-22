import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import FilterBar from '../components/FilterBar';
import gamePreview from '../assets/images/png/game-preview.png'; 
import '../assets/css/searchPage.css';

const SearchPage = () => {
  const sampleGames = [
    { id: 1, title: "Game 1", description: "Description for Game 1" },
    { id: 2, title: "Game 2", description: "Description for Game 2" },
    { id: 3, title: "Game 3", description: "Description for Game 3" },
    { id: 4, title: "Game 4", description: "Description for Game 4" },
    { id: 5, title: "Game 5", description: "Description for Game 5" },
    { id: 6, title: "Game 6", description: "Description for Game 6" },
    { id: 7, title: "Game 7", description: "Description for Game 7" },
    { id: 8, title: "Game 8", description: "Description for Game 8" },
  ];

  const [games, setGames] = useState(sampleGames);

  const handleFilterSelect = (filter) => {
    console.log(`Filter selected: ${filter}`);
  };

  return (
    <div className="search-page">
      <FilterBar onFilterSelect={handleFilterSelect} />
      <div className="display-area">
        {games.map((game) => (
          <Link key={game.id} to={`/game/${game.id}`} className="game-card">
            <img src={gamePreview} alt={game.title} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SearchPage;