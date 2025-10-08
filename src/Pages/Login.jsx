import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = ({ setUser }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 10000);

      const res = await axios.post(
        "https://smart-attendance-backend-3.onrender.com/api/auth/login",
        formData,
        { signal: controller.signal }
      );

      clearTimeout(timeout);
      setLoading(false);

      localStorage.setItem("token", res.data.token);

      if (res.data.user) {
        const userObj = typeof res.data.user === "string"
          ? { email: res.data.user }
          : res.data.user;

        localStorage.setItem("user", JSON.stringify(userObj));
        setUser(userObj);
      }

      navigate("/dashboard");
    } catch (err) {
      setLoading(false);
      if (err.code === "ERR_CANCELED") {
        setError("Request timed out. Please try again.");
      } else if (err.response && err.response.data) {
        setError(err.response.data.message || "Invalid credentials.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="email"
              name="email"
              placeholder="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <input
              type="password"
              name="password"
              placeholder="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {error && <p className="error-msg">{error}</p>}

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="signup-link">
          Don’t have an account? <a href="/signup">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
