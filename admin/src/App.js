import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Home from './pages/Home';
import Login from "./pages/Login";
import Chat from './pages/Chat';
import Error404 from "./pages/Error404";
import Error500 from "./pages/Error500";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/500" element={<Error500 />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
