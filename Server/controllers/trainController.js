const db = require("../models");
const Train = db.Train;

exports.createTrain = async (req, res) => {
  try {
    const {
      train_name,
      source,
      destination,
      seat_capacity,
      arrival_time_at_source,
      arrival_time_at_destination,
    } = req.body;
    const train = await Train.create({
      train_name,
      source,
      destination,
      seat_capacity,
      available_seats: seat_capacity,
      arrival_time_at_source,
      arrival_time_at_destination,
    });
    res
      .status(201)
      .json({ message: "Train added successfully", train_id: train.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAvailability = async (req, res) => {
  try {
    const { source, destination } = req.query;
    // console.log(source, destination);
    // console.log(Train);
    const trains = await Train.findAll({ where: { source, destination } });
    const result = trains.map((train) => ({
      train_id: train.id,
      train_name: train.train_name,
      available_seats: train.available_seats,
    }));
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
