import React from 'react';

const Dropdown = ({ neighborhoods, onSelect }) => {
  return (
    <select onChange={(e) => onSelect(e.target.value)}>
      <option value="">Select Neighborhood</option>
      {neighborhoods.map((neighborhood) => (
        <option key={neighborhood.id} value={neighborhood.name}>
          {neighborhood.name}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;