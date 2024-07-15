import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import TrainAvailabilityPage from "./pages/TrainAvailabilityPage";
import BookingPage from "./pages/BookingPage";
import BookingDetailsPage from "./pages/BookingDetailsPage";
import NavBar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import AddTrainPage from "./pages/AddTrainPage";
import AdminRoute from "./components/AdminRoute";
import AuthRoute from "./components/AuthRoute";

const isAuth = () => {
  const token = localStorage.getItem("token");
  return !!token;
};

export const isAdmin = () => {
  const token = localStorage.getItem("token");
  return token && JSON.parse(atob(token.split(".")[1])).role === "admin";
};

function App() {
  return (
    <>
      <ToastContainer />
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/trains/availability"
            element={<TrainAvailabilityPage />}
          />
          <Route
            path="/trains/:train_id/book"
            element={<AuthRoute isAuth={isAuth} element={<BookingPage />} />}
          />
          <Route
            path="/bookings/:booking_id"
            element={<BookingDetailsPage />}
          />
          <Route
            path="/admin/add-train"
            element={
              <AdminRoute isAdmin={isAdmin} element={<AddTrainPage />} />
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
