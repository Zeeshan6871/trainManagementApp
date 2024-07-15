const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");
const { authenticateToken } = require("../middleware/auth");

router.post("/:train_id/book", authenticateToken, bookingController.bookSeat);
router.get(
  "/:booking_id",
  authenticateToken,
  bookingController.getBookingDetails
);

module.exports = router;
