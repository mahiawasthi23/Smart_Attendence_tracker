import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
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
      const timeout = setTimeout(() => controller.abort(), 10000); // 10s timeout

      const res = await axios.post(
        "https://smart-attendance-backend-3.onrender.com/api/auth/login",
        formData,
        { signal: controller.signal }
      );

      clearTimeout(timeout);

      localStorage.setItem("token", res.data.token);
      if (res.data.user) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
      }

      setMessage(res.data.message || "Login successful 🎉");
      setTimeout(() => navigate("/dashboard"), 800);
    } catch (error) {
      if (axios.isCancel(error)) {
        setMessage("⏳ Server is slow. Please retry.");
      } else {
        setMessage(error.response?.data?.message || "Login failed ❌");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>

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

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <p>
        Don’t have an account? <Link to="/signup">Sign Up here</Link>
      </p>
    </div>
  );
};

export default Login;
