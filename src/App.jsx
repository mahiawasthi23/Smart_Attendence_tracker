import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Pages/Login";
import Sign from "./Pages/Sign";

function App() {
  const user = localStorage.getItem("user");


  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            user ? <Navigate to="/login" replace /> : <Navigate to="/signup" replace />
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Sign />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
