import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Home from './pages/Home';
import Login from "./pages/Login";
import Chat from './pages/Chat';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
