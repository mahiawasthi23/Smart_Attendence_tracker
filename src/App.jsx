import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Sign from "./Pages/Sign";
import StudentDashboard from "./Pages/Dashboard/StudentDashboard";
import AdminDashboard from "./Pages/Dashboard/AdminDashboard";


const DashboardRouter = ({ user }) => {
    if (user && user.role === 'admin') {
        return <AdminDashboard />;
    }
    return <StudentDashboard />;
};


function App() {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("user");
        try {
            return storedUser ? JSON.parse(storedUser) : null;
        } catch {
            return storedUser ? { email: storedUser, role: 'student' } : null;
        }
    });
    useEffect(() => {
        const handleStorageChange = () => {
            const storedUser = localStorage.getItem("user");
            try {
                setUser(storedUser ? JSON.parse(storedUser) : null);
            } catch {
                setUser(storedUser ? { email: storedUser, role: 'student' } : null);
            }
        };

        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, []);
    return (
        <Router>
            <Navbar user={user} setUser={setUser} />

            <div className="main-content min-h-screen pt-16 bg-gray-50">
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
                        element={user ? <DashboardRouter user={user} /> : <Navigate to="/login" replace />}
                    />
                    
                    <Route
                        path="/profile"
                        element={user ? <h1>Profile Page</h1> : <Navigate to="/login" replace />}
                    />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
