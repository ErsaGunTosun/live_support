import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Chat from "./pages/Chat/Chat"
import Register from "./pages/Register/Register";

import Support  from "./Support";

export default function App() {
  return (
    // <BrowserRouter>
    //   <Routes>
    //     <Route path="/register" element={<Register />} />
    //     <Route path="/chat" element={<Chat />} />
    //     <Route path="/*" element={<Register />} />
    //   </Routes>
    // </BrowserRouter>
    <Support />
  );
}
