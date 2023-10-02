import React from "react";
import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Chats from "./pages/Chats";
import AuthWrapper from "./components/AuthWrapper";

function App() {
  return (
    <>
      <Routes>
        <Route path="/chats" element={<Chats />} />
        <Route path="/" element={<Homepage />} />
      </Routes>
    </>
  );
}

export default App;
