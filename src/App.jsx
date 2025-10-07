import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div>
        <h1>Attendance Tracker</h1>
      </div>

      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

