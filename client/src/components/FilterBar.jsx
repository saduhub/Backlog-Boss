import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/css/filterBar.css';

const FilterBar = ({ onFilterSelect }) => {
  const filters = ['Trending', 'Newest', 'Related'];
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/search'); 
  };

  return (
    <div className="filter-bar">
      {/* Back Button */}
      <button className="back-button" onClick={handleBack}>
        Back to Search
      </button>

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
