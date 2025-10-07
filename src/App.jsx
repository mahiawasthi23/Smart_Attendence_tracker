import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<h1>Home Page</h1>} />
        <Route path="/login" element={<h1>Login Page</h1>} />
        <Route path="/signup" element={<h1>Signup Page</h1>} />
        <Route path="/dashboard" element={<h1>Dashboard Page</h1>} />
        <Route path="/profile" element={<h1>Profile Page</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
