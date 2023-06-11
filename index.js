const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_URI);

// Routes
const offersRoute = require("./routes/offer.route");
const reservationsRoute = require("./routes/reservation.route");
const adminRoute = require("./routes/admin.route");

app.use("/offer", offersRoute);
app.use("/reservation", reservationsRoute);
app.use("/admin", adminRoute);

// Home
app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to Sixt server 🚘 💖" });
});

// All routes
app.all("*", (req, res) => {
  res.status(404).json({ message: "This route does not exist" });
});

// Lancement serveur
app.listen(process.env.PORT, () => {
  console.log(`Server started on PORT ${process.env.PORT} 🚀`);
});
