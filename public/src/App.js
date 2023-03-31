import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Components
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
