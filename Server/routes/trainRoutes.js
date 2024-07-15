const express = require("express");
const router = express.Router();
const trainController = require("../controllers/trainController");
const {
  authenticateToken,
  isAdmin,
  verifyApiKey,
} = require("../middleware/auth");

router.post(
  "/create",
  authenticateToken,
  verifyApiKey,
  isAdmin,
  trainController.createTrain
);
router.get("/availability", trainController.getAvailability);

module.exports = router;
