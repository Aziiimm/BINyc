import React, { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import NavBar from "../components/Header";
import { MdLocationPin } from "react-icons/md";
import L from "leaflet";
import ReactDOMServer from "react-dom/server";

// Mock data for trash reports (replace with API data later)
const mockReports = [
  {
    id: 1,
    title: "Trash Pile on 5th Ave",
    description: "A large pile of visible trash near the sidewalk.",
    bounty: "$10",
    date: "2024-11-07 10:30 AM",
    coordinates: [40.73061, -73.935242],
    distance: "0.5 miles",
  },
  {
    id: 2,
    title: "Overflowing Garbage Bin",
    description: "Garbage bin overflowing, causing litter.",
    bounty: "$15",
    date: "2024-11-06 2:15 PM",
    coordinates: [40.74161, -73.945242],
    distance: "1.2 miles",
  },
  {
    id: 3,
    title: "Illegal Dumping Spot",
    description: "Trash bags dumped in an alleyway.",
    bounty: "$20",
    date: "2024-11-05 6:00 PM",
    coordinates: [40.72561, -73.955242],
    distance: "0.8 miles",
  },
];

const customIcon = new L.DivIcon({
  className: "custom-pin",
  html: ReactDOMServer.renderToString(
    <MdLocationPin className="text-3xl text-red-600" />,
  ),
  iconSize: [24, 24],
  iconAnchor: [12, 24],
  popupAnchor: [0, -24],
});

// Component to Center the Map
const MapCenter = ({ coordinates }) => {
  const map = useMap();
  useEffect(() => {
    if (coordinates) {
      map.setView(coordinates, 14, { animate: true });
    }
  }, [coordinates, map]);
  return null;
};

const Reports = () => {
  const [userLocation, setUserLocation] = useState([40.73061, -73.935242]);
  const [reports, setReports] = useState(mockReports);
  const [selectedCoordinates, setSelectedCoordinates] = useState(null);

  // Fetch user's current location (optional, for demo purposes)
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
