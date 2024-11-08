import React from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import Tooltip from './Tooltip';

const Map = ({ locations, onSelectLocation }) => {
  const mapStyles = { height: "70vh", width: "100%" };
  const defaultCenter = { lat: 40.730610, lng: -73.935242 };

  return (
    <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
      <GoogleMap mapContainerStyle={mapStyles} zoom={12} center={defaultCenter}>
        {locations.map(location => (
          <Marker
            key={location.id}
            position={location.coords}
            onClick={() => onSelectLocation(location)}
          >
            <Tooltip location={location} />
          </Marker>
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;