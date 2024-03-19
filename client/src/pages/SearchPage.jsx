import React, { useState } from 'react';
import FilterBar from '../components/FilterBar';
import '../assets/css/searchPage.css';

const SearchPage = () => {
const [games, setGames] = useState([]); 

  const handleFilterSelect = (filter) => {
    console.log(`Filter selected: ${filter}`);
  };

  return (
    <div className="search-page">
      <FilterBar onFilterSelect={handleFilterSelect}/>
      <div className="display-area">
        {games.length > 0 ? (
          games.map((game, index) => (
          <div key={index} className="game-card">
            <h3 className="game-title">{game.title}</h3>
              {/*Place holder for more content when needed*/}
            </div>
          ))
        ) : (
          <p>No games to display</p>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
