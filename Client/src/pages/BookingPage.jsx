import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { API } from "../config/Api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../index.css";

const BookingPage = () => {
  const { train_id } = useParams();
  const [no_of_seats, setNoOfSeats] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleBook = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${API}/api/bookings/${train_id}/book`,
        { no_of_seats },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const seats = response.data.seatNumbers.join(",");
      // console.log(response.data);
      toast.success(`Booking successful! Seat numbers: ${seats}`);
      navigate(`/bookings/${response.data.booking_id}`);
    } catch (error) {
      toast.error("Booking failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="container">
        <ToastContainer />
        <h1>Book Seats</h1>
        <form onSubmit={handleBook}>
          <label htmlFor="">Enter How many Seat you want to book</label>
          <input
            type="number"
            min="1"
            value={no_of_seats}
            onChange={(e) => setNoOfSeats(e.target.value)}
            required
          />
          <button type="submit">Book</button>
        </form>
        {loading && <p className="loading">Loading....</p>}
      </div>
    </>
  );
};

export default BookingPage;
