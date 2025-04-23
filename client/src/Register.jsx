import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./register.css"; 


const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const baseURL = import.meta.env.VITE_API_BASE_URL


  const validateForm = () => {
    if (!name || !email || !password) {
      setError("All fields are required");
      return false;
    }

    if (name.length < 2) {
      setError("Name must be at least 2 characters");
      return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return false;
    }
    
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
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
      const response = await axios.post(`${baseURL}/register`, { 
        name, 
        email, 
        password 
      });
      console.log(response.data);
      navigate('/login');
    } catch (error) {
      console.error("Error:", error.message);
      setError(error.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Account</h2>
      
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button 
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? "Creating Account..." : "Register"}
      </button>

      <span>Already have an account? <Link to="/login">Login</Link></span>
    </form>
  );
};

export default Register;