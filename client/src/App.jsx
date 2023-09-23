import "./App.css";
import Homepage from "./pages/Homepage";
import Chats from "./pages/Chats";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/chats" element={<Chats />} />
      </Routes>
    </>
  );
}

export default App;
