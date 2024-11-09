import { Routes, Route, BrowserRouter } from "react-router-dom";
import Chatbot from "./pages/ChatBot";
import LandingPage from "./pages/landingpage";
import Map from "./pages/MapPage";
import Reports from "./pages/Reports";
import Form from "./pages/Form";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/chat" element={<Chatbot />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/map" element={<Map />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/form" element={<Form />} />
      </Routes>
    </BrowserRouter>
  );
}
