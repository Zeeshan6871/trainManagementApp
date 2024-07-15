import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { API } from "../config/Api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Oval } from "react-loader-spinner";
import "../index.css";

const BookingDetailsPage = () => {
  const { booking_id } = useParams();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${API}/api/bookings/${booking_id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBooking(response.data);
      } catch (error) {
        toast.error("Failed to fetch booking details");
      } finally {
        setLoading(false);
      }
    };

    fetchBookingDetails();
  }, [booking_id]);

  if (loading)
    return (
      <div className="loading">
        <Oval />
      </div>
    );

  return (
    <div className="container">
      <ToastContainer />
      <h1>Booking Details</h1>
      <p>Train: {booking.train_name}</p>
      <p>Booking ID : {booking_id}</p>
      <span style={{ color: "red" }}>
        Remember this Booking ID to track you Booking detials
      </span>
      <p>User ID: {booking.user_id}</p>
      <p>Number of Seats: {booking.no_of_seats}</p>
      <p>Seat Numbers: {booking.seat_numbers.join(", ")}</p>
      <p>Arrival Time at Source: {booking.arrival_time_at_source}</p>
      <p>Arrival Time at Destination: {booking.arrival_time_at_destination}</p>
    </div>
  );
};

export default BookingDetailsPage;
