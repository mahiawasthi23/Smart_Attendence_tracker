import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Sign.css";

const Sign = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 10000); 

      const res = await axios.post(
        "https://smart-attendance-backend-3.onrender.com/api/auth/signup",
        formData,
        {
          headers: { "Content-Type": "application/json" },
          signal: controller.signal,
        }
      );

      clearTimeout(timeout);
      setMessage(res.data.message || "Signup successful 🎉");

      setFormData({ name: "", email: "", password: "", role: "student" });

      setTimeout(() => navigate("/login"), 1000);
    } catch (error) {
      if (axios.isCancel(error)) {
        setMessage("⏳ Server is taking too long. Please try again.");
      } else {
        setMessage(error.response?.data?.message || "Signup failed ❌");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>

      {message && (
        <p
          className={`message ${
            message.toLowerCase().includes("fail") ||
            message.toLowerCase().includes("error")
              ? "error"
              : "success"
          }`}
        >
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email (@navgurukul.org)"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <select name="role" value={formData.role} onChange={handleChange}>
          <option value="student">Student</option>
          <option value="admin">Admin</option>
        </select>

        <button type="submit" disabled={loading}>
          {loading ? " Signing up..." : "Sign Up"}
        </button>
      </form>

      {message.includes("long") && (
        <button className="retry-btn" onClick={handleSubmit}>
          🔁 Try Again
        </button>
      )}
    </div>
  );
};

export default Sign;
