import React, { useEffect } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Chatbot from "./pages/ChatBot";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/chat" element={<Chatbot />} />
      </Routes>
    </BrowserRouter>
  );
}
