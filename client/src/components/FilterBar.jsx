import React from 'react';
import '../assets/css/filterBar.css';

const FilterBar = ({ onFilterSelect }) => {
  const filters = ['Alphabetical', 'Rating', 'Release Date', 'Platform', 'Genre'];

  return (
    <div className="filter-bar">
      {filters.map(filter => (
        <button key={filter} className="filter-button" onClick={() => onFilterSelect(filter)}>
          {filter}
        </button>
      ))}
    </div>
  );
};

export default FilterBar;
