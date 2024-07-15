import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API } from "../config/Api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../index.css";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${API}/api/auth/login`, {
        username,
        password,
      });
      localStorage.setItem("token", response.data.access_token);
      //   localStorage.setItem("token", response.data.role);
      toast.success("Login successful!");
      navigate("/");
    } catch (error) {
      toast.error("Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* <ToastContainer /> */}
      <div className="container">
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
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
          <button type="submit">Login</button>
          {loading && <p className="loading">Loging in......</p>}
        </form>
      </div>
    </>
  );
};

export default LoginPage;
