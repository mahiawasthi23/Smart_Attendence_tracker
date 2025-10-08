import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Sign from "./Pages/Sign";
import Login from "./Pages/Login";
import Navbar from "./Components/Navbar";

import "./App.css";
import "./Components/Navbar.css";
import "./Pages/Sign.css";
import "./index.css";

function App() {
  const user = localStorage.getItem("user");

  return (
    <Router>
      <Navbar />
      <Routes>
       
        <Route
          path="/"
          element={
            user ? <Navigate to="/login" replace /> : <Navigate to="/signup" replace />
          }
        />

        <Route path="/signup" element={<Sign />} />
        <Route path="/login" element={<Login />} />

        <Route path="*" element={<Navigate to="/signup" replace />} />
      </Routes>
    </Router>
  );
}

export default App;

