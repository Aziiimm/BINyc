import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import NavBar from "../components/Header";
import { MdLocationPin } from "react-icons/md";
import L from "leaflet";
import ReactDOMServer from "react-dom/server";

// Custom icon using MdLocationPin from react-icons
const customIcon = new L.DivIcon({
  className: "custom-pin",
  html: ReactDOMServer.renderToString(
    <MdLocationPin className="text-3xl text-red-600" />,
  ),
  iconSize: [24, 24],
  iconAnchor: [12, 24],
  popupAnchor: [0, -24],
});

// Helper function to calculate distance using the Haversine formula (in miles)
const haversineDistance = (coords1, coords2) => {
  const toRad = (value) => (value * Math.PI) / 180;

  const [lat1, lon1] = coords1;
  const [lat2, lon2] = coords2;

  const R = 6371; // Radius of Earth in kilometers
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distanceInKm = R * c;

  // Convert kilometers to miles
  const distanceInMiles = distanceInKm * 0.621371;
  return distanceInMiles;
};

// Component to Center the Map
const MapCenter = ({ coordinates }) => {
  const map = useMap();
  useEffect(() => {
    if (coordinates) {
      map.flyTo(coordinates, 14, { animate: true });
    }
  }, [coordinates, map]);
  return null;
};

const Reports = () => {
  const [userLocation, setUserLocation] = useState([40.73061, -73.935242]);
  const [reports, setReports] = useState([]);
  const [selectedCoordinates, setSelectedCoordinates] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch reports data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/data");
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();

        // Transform data and calculate distance
        const formattedData = data.map((item) => {
          let coordinatesArray = [40.73061, -73.935242]; // Default fallback coordinates
          if (item.location) {
            const coords = item.location
              .split(",")
              .map((coord) => parseFloat(coord.trim()));
            if (coords.length === 2 && !isNaN(coords[0]) && !isNaN(coords[1])) {
              coordinatesArray = coords;
            }
          }

          const distance = haversineDistance(
            userLocation,
            coordinatesArray,
          ).toFixed(2);
          return {
            id: item._id,
            title: item.title || "Untitled Report",
            description: item.description || "No description provided.",
            bounty: item.bounty || "No bounty",
            date: item.time || "Unknown date",
            coordinates: coordinatesArray,
            distance: `${distance} miles`,
          };
        });

        setReports(formattedData);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch reports:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [userLocation]);

  // Fetch user's current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([latitude, longitude]);
        },
        () => {
          console.error("Unable to fetch location.");
        },
      );
    }
  }, []);

  const handleReportClick = (coordinates) => {
    setSelectedCoordinates(coordinates);
  };

  if (loading)
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="flex h-screen items-center justify-center">
        Error: {error}
      </div>
    );

  return (
    <div className="flex h-screen flex-col bg-gray-200">
      <NavBar />

      <div className="mt-16 flex flex-1 gap-4 p-4">
        <div className="h-full w-8/12">
          <div className="h-full w-full overflow-hidden rounded-lg border border-gray-300 shadow-xl">
            <MapContainer
              center={userLocation}
              zoom={12}
              className="h-full w-full"
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; OpenStreetMap contributors"
              />
              {selectedCoordinates && (
                <MapCenter coordinates={selectedCoordinates} />
              )}
              {/* Render Markers for Each Report */}
              {reports.map((report) => (
                <Marker
                  key={report.id}
                  position={report.coordinates}
                  icon={customIcon}
                >
                  <Popup>
                    <h3 className="font-bold">{report.title}</h3>
                    <p>{report.description}</p>
                    <p>
                      <strong>Bounty:</strong> {report.bounty}
                    </p>
                    <p>
                      <strong>Posted:</strong> {report.date}
                    </p>
                    <p>
                      <strong>Distance:</strong> {report.distance}
                    </p>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>

        <aside className="h-full w-4/12 overflow-y-auto rounded-lg bg-gray-100 shadow-lg">
          <div className="rounded-t-lg bg-[rgb(20,52,43)] p-4 text-white">
            <h2 className="text-xl font-bold">Nearby Reports</h2>
          </div>
          <div className="p-4">
            {reports.map((report) => (
              <div
                key={report.id}
                className="mb-4 flex cursor-pointer items-center justify-between rounded-lg border border-gray-300 bg-white p-4 shadow-sm"
                onClick={() => handleReportClick(report.coordinates)}
              >
                <div>
                  <h3 className="text-md font-bold underline">
                    {report.title}
                  </h3>
                  <p className="text-sm text-gray-700">{report.description}</p>
                  <p className="text-sm">
                    <strong>Bounty:</strong> {report.bounty}
                  </p>
                  <p className="text-sm">
                    <strong>Date:</strong> {report.date}
                  </p>
                  <p className="text-sm">
                    <strong>Distance:</strong> {report.distance}
                  </p>
                </div>

                <div className="flex flex-col items-center text-gray-600">
                  <MdLocationPin className="text-2xl text-red-600" />
                  <p className="text-sm">{report.distance}</p>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Reports;
