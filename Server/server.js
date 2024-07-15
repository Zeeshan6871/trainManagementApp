const express = require("express");
const db = require("./models");
const authRoutes = require("./routes/authRoutes");
const trainRoutes = require("./routes/trainRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const PORT = process.env.PORT || 3000;
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/trains", trainRoutes);
app.use("/api/bookings", bookingRoutes);

async function ConnectToDB() {
  try {
    await db.sequelize.authenticate();
    console.log("Connection to database has established successfully");
    await db.sequelize.sync();
  } catch (err) {
    console.log("unable to connect");
    console.log(err);
  }
}

app.listen(PORT, async () => {
  await ConnectToDB();
  console.log(`Server running on port ${PORT}`);
});
