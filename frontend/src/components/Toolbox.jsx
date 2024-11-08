import React from 'react';

const Tooltip = ({ location }) => {
  return (
    <div className="tooltip">
      <h4>{location.name}</h4>
      <p>AQI: {location.aqi}</p>
    </div>
  );
};

export default Tooltip;