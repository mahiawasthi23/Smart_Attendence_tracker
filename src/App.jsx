import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Sign from "./Pages/Sign";
// import Footer from "./Components/Footer";

function App() {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    try {
      return storedUser ? JSON.parse(storedUser) : null;
    } catch {
      return { email: storedUser };
    }
  });

  useEffect(() => {
    const handleStorageChange = () => {
      const storedUser = localStorage.getItem("user");
      try {
        setUser(storedUser ? JSON.parse(storedUser) : null);
      } catch {
        setUser(storedUser ? { email: storedUser } : null);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <Router>
      <Navbar user={user} setUser={setUser} />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/login"
          element={!user ? <Login setUser={setUser} /> : <Navigate to="/dashboard" replace />}
        />
        <Route
          path="/signup"
          element={!user ? <Sign setUser={setUser} /> : <Navigate to="/dashboard" replace />}
        />

        <Route
          path="/dashboard"
          element={user ? <h1>Dashboard Page</h1> : <Navigate to="/login" replace />}
        />
        <Route
          path="/profile"
          element={user ? <h1>Profile Page</h1> : <Navigate to="/login" replace />}
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* <Footer /> */}
    </Router>
  );
}

export default App;


