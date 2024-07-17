// src/pages/AddTrainPage.jsx
import React, { useState } from "react";
import axios from "axios";
import { API } from "../config/Api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddTrainPage = () => {
  const [trainName, setTrainName] = useState("");
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [seatCapacity, setSeatCapacity] = useState("");
  const [arrivalTimeSource, setArrivalTimeSource] = useState("");
  const [arrivalTimeDestination, setArrivalTimeDestination] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddTrain = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${API}/api/trains/create`,
        {
          train_name: trainName,
          source,
          destination,
          seat_capacity: seatCapacity,
          arrival_time_at_source: arrivalTimeSource,
          arrival_time_at_destination: arrivalTimeDestination,
        },
        {
          headers: { Authorization: `Bearer ${token}`, "x-api-key": "admin" },
        }
      );
      toast.success("Train added successfully!");
    } catch (error) {
      toast.error("Failed to add train");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Add Train</h1>
      <form onSubmit={handleAddTrain}>
        <input
          type="text"
          placeholder="Train Name"
          value={trainName}
          onChange={(e) => setTrainName(e.target.value)}
          required
        />
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
        <input
          type="number"
          placeholder="Seat Capacity"
          value={seatCapacity}
          onChange={(e) => setSeatCapacity(e.target.value)}
          required
        />
        <input
          type="time"
          placeholder="Arrival Time at Source"
          value={arrivalTimeSource}
          onChange={(e) => setArrivalTimeSource(e.target.value)}
          required
        />
        <input
          type="time"
          placeholder="Arrival Time at Destination"
          value={arrivalTimeDestination}
          onChange={(e) => setArrivalTimeDestination(e.target.value)}
          required
        />
        <button type="submit">Add Train</button>
      </form>
      {loading && <p className="loading">Adding Train...</p>}
    </div>
  );
};

export default AddTrainPage;
