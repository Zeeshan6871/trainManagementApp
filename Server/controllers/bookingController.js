const db = require("../models");
const Booking = db.Booking;
const Train = db.Train;

exports.bookSeat = async (req, res) => {
  const { train_id } = req.params;
  const { user_id, no_of_seats } = req.body;

  const transaction = await db.sequelize.transaction();
  try {
    const train = await Train.findByPk(train_id, { transaction });
    if (train.available_seats < no_of_seats) {
      return res.status(400).json({ message: "Not enough seats available" });
    }

    const seatNumbers = Array.from(
      { length: no_of_seats },
      (_, i) => train.seat_capacity - train.available_seats + i + 1
    );
    await train.update(
      { available_seats: train.available_seats - no_of_seats },
      { transaction }
    );
    console.log(user_id, train_id, no_of_seats, seatNumbers);
    // console.log(Booking);
    const booking = await Booking.create(
      { user_id, train_id, no_of_seats, seat_numbers: seatNumbers },
      { transaction }
    );

    await transaction.commit();
    res.status(201).json({
      message: "Seat booked successfully",
      booking_id: booking.id,
      seatNumbers,
    });
  } catch (error) {
    await transaction.rollback();
    res.status(500).json({ error: error.message });
  }
};

exports.getBookingDetails = async (req, res) => {
  try {
    const { booking_id } = req.params;
    const booking = await Booking.findByPk(booking_id, {
      include: [
        { model: db.User, attributes: ["username"] },
        {
          model: db.Train,
          attributes: [
            "train_name",
            "arrival_time_at_source",
            "arrival_time_at_destination",
          ],
        },
      ],
    });
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.json({
      booking_id: booking.id,
      train_id: booking.train_id,
      train_name: booking.Train.train_name,
      user_id: booking.user_id,
      no_of_seats: booking.no_of_seats,
      seat_numbers: booking.seat_numbers,
      arrival_time_at_source: booking.Train.arrival_time_at_source,
      arrival_time_at_destination: booking.Train.arrival_time_at_destination,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
