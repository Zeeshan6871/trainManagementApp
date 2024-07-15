import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API } from "../config/Api";
import "../index.css";

const TrainAvailabilityPage = () => {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [trains, setTrains] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notTrain, setNoTrain] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.get(
        `${API}/api/trains/availability?source=${source}&destination=${destination}`
      );
      if (response.data.length < 1) {
        setNoTrain(true);
        setTrains([]);
        return;
      }
      //   setNoTrain(true);
      setTrains(response.data);
      setNoTrain(false);
    } catch (error) {
      alert("Failed to fetch train availability");
    } finally {
      setLoading(false);
    }
  };

  const handleBooking = (train_id) => {
    navigate(`/trains/${train_id}/book`);
  };

  return (
    <div className="container">
      <h1>Train Availability</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Source"
          value={source}
          onChange={(e) => setSource(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          required
        />
        <button type="submit">Search</button>
      </form>
      {loading ? (
        <div className="loading">Loading...</div>
      ) : notTrain ? (
        <div>No Train Found </div>
      ) : (
        <ul>
          {trains.map((train) => (
            <li key={train.train_id} className="train-item">
              {train.train_name} - Available Seats: {train.available_seats}
              <button onClick={() => handleBooking(train.train_id)}>
                Book ticket
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TrainAvailabilityPage;
