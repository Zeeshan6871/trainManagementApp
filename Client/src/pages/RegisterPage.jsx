import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API } from "../config/Api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../index.css";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/api/auth/register`, { username, password });
      toast.success("Registration successful!");
      navigate("/login");
    } catch (error) {
      toast.error("Registration failed");
    }
  };

  return (
    <div className="container">
      <ToastContainer />
      <h1>Register</h1>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;
