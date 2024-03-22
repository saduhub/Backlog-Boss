import React from 'react';
import '../assets/css/filterBar.css';

const FilterBar = ({ onFilterSelect }) => {
  const filters = ['Top 100', 'Best Rated', 'Indies', 'Newest', 'Top PC']; 

  return (
    <div className="filter-bar">
      {filters.map((filter, index) => (
        <button
          key={index}
          className="filter-button"
          onClick={() => onFilterSelect(filter)}
        >
          {filter}
        </button>
      ))}
    </div>
  );
};

export default FilterBar;
