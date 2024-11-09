import { Routes, Route, BrowserRouter } from "react-router-dom";
import Chatbot from "./pages/ChatBot";
import LandingPage from "./pages/landingpage";
import Map from "./pages/MapPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/chat" element={<Chatbot />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/map" element={<Map />} />
      </Routes>
    </BrowserRouter>
  );
}
