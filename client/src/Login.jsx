import { useState } from "react";
import React from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import './login.css';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const baseURL = import.meta.env.VITE_API_BASE_URL

  const validateForm = () => {
    if (!email || !password) {
      setError("Email and password are required");
      return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      const response = await axios.post(`${baseURL}/login`, { email, password });
      console.log(response.data);
      navigate('/surah');
    } catch (error) {
      console.error("Error:", error.message);
      setError(error.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="form-container">
      <form className="form-box" onSubmit={handleSubmit}>
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Login</h2>
        
        {error && (
          <div style={{ 
            color: "#fff", 
            backgroundColor: "rgba(255, 0, 0, 0.3)", 
            padding: "10px", 
            borderRadius: "4px",
            marginBottom: "15px"
          }}>
            {error}
          </div>
        )}

        <input 
          className="email"
          type="email" 
          placeholder="Email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input 
          className="password"
          type="password" 
          placeholder="Password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          className="form-submit-btn"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>

        <span>Don't have an account? <Link to="/register">Register</Link></span>
      </form>
    </div>
  );
};

export default Login;