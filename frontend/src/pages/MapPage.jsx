import React from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import NavBar from "../components/Header";
import boundary from "../data/queens-neighborhood.json";
import airQualityData from "../data/data.json";

const MapPage = () => {
  const onEachNeighborhood = (feature, layer) => {
    const neighborhoodName = feature.properties.name;

    const neighborhoodData = airQualityData.filter(
      (item) => item.neighborhood === neighborhoodName,
    );

    let popupContent = `<strong>${neighborhoodName}</strong>`;

    if (neighborhoodData.length > 0) {
      popupContent += "<br><br><strong>Air Quality Data:</strong><ul>";
      neighborhoodData.forEach((item) => {
        popupContent += `
          <li>
            <strong>${item.indicator_name}:</strong> ${item.data_value_geo_entity} ${item.units} (${item.time})
          </li>
        `;
      });
      popupContent += "</ul>";
    } else {
      popupContent += "<br><br>No air quality data available.";
    }

    layer.bindPopup(popupContent);
  };

  return (
    <div className="flex h-screen flex-col">
      <NavBar />

      <div className="flex flex-1">
        <div className="flex h-full w-3/4 flex-col">
          <div className="flex justify-around bg-white py-2 shadow-md">
            <button className="rounded bg-teal-600 px-4 py-2 text-white hover:bg-teal-700">
              Air Pollutants
            </button>
            <button className="rounded bg-gray-300 px-4 py-2 hover:bg-gray-400">
              Heating Fuel
            </button>
            <button className="rounded bg-gray-300 px-4 py-2 hover:bg-gray-400">
              Air Toxics
            </button>
            <button className="rounded bg-gray-300 px-4 py-2 hover:bg-gray-400">
              Fine Particles
            </button>
          </div>

          <MapContainer
            center={[40.73061, -73.935242]}
            zoom={12}
            className="h-full w-full"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />
            <GeoJSON data={boundary} onEachFeature={onEachNeighborhood} />
          </MapContainer>
        </div>

        <aside className="w-1/4 overflow-y-auto bg-gray-100 p-4">
          <h2 className="mb-2 text-lg font-bold">
            Queens Neighborhood Level Data
          </h2>
          <div className="mb-4">
            <button className="w-full rounded bg-teal-600 py-2 text-white hover:bg-teal-700">
              Select Neighborhood
            </button>
          </div>
          <div className="space-y-2">
            <p>
              <strong>Location:</strong> Queens
            </p>
            <p>
              <strong>Neighborhood:</strong> Astoria
            </p>
            <p>
              <strong>Estimated Population:</strong> 156,620
            </p>
            <p>
              <strong>Median Age:</strong> 36.7
            </p>
            <h3 className="mt-4 font-semibold">Air Quality Index (AQI)</h3>
            <p>
              <strong>Current AQI:</strong> 57 (Moderate)
            </p>
            <p>
              <strong>Primary Pollutant:</strong> PM2.5
            </p>
            <p>
              <strong>AQI Trend:</strong> Slightly decreasing over 24 hours
            </p>
            <h3 className="mt-4 font-semibold">Pollutant Details</h3>
            <ul className="ml-5 list-disc">
              <li>PM2.5: 14 µg/m³ (Moderate)</li>
              <li>PM10: 20 µg/m³ (Good)</li>
              <li>Ozone: 45 ppb (Good)</li>
              <li>NO2: 21 ppb (Moderate)</li>
              <li>SO2: 5 ppb (Good)</li>
              <li>CO: 0.5 ppm (Good)</li>
            </ul>
            <h3 className="mt-4 font-semibold">Health Impact</h3>
            <ul className="ml-5 list-disc">
              <li>
                Sensitive Groups: Risk for children, elderly, individuals with
                respiratory conditions
              </li>
              <li>Advisory: Limit outdoor activities if you have asthma</li>
              <li>Daily Recommendation: Light outdoor activities are fine</li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default MapPage;
