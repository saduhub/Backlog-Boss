import React, { useState } from 'react';
import FilterBar from '../components/FilterBar';
import '../assets/css/searchPage.css';

const SearchPage = () => {
  const sampleGames = [
    { id: 1, title: "Game 1", description: "Description for Game 1" },
    { id: 2, title: "Game 2", description: "Description for Game 2" },
    { id: 3, title: "Game 3", description: "Description for Game 3" },
  ];

  const [games, setGames] = useState(sampleGames); 

  const handleFilterSelect = (filter) => {
    console.log(`Filter selected: ${filter}`);
    const filteredGames = sampleGames.filter(game => game.title.includes(filter));
    setGames(filteredGames);
  };

  return (
    <div className="search-page">
      <FilterBar onFilterSelect={handleFilterSelect}/>
      <div className="display-area">
        {games.length > 0 ? (
          games.map((game) => (
            <div key={game.id} className="game-card">
              <h3 className="game-title">{game.title}</h3>
              <p>{game.description}</p>
              {/* will add more content here*/}
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
