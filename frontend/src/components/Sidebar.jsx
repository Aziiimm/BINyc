import React from 'react';
import Dropdown from './Dropdown';

const Sidebar = ({ neighborhoodData }) => {
  return (
    <aside className="sidebar">
      <h2>Queens Neighborhood Level Data</h2>
      <Dropdown />
      {neighborhoodData && (
        <>
          <p><strong>Location:</strong> {neighborhoodData.location}</p>
          <p><strong>Estimated Population:</strong> {neighborhoodData.population}</p>
          <p><strong>Air Quality Index:</strong> {neighborhoodData.aqi}</p>
          <div>
            <h3>Pollutant Details</h3>
            <p>PM2.5: {neighborhoodData.pm25}</p>
            <p>Ozone: {neighborhoodData.ozone}</p>
            {/* More pollutant details */}
          </div>
          <div>
            <h3>Health Impact</h3>
            <p>{neighborhoodData.healthImpact}</p>
          </div>
        </>
      )}
    </aside>
  );
};

export default Sidebar;