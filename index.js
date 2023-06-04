const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_LOCAL);

// Routes
const offersRoute = require("./routes/offer.route");
// const offersRoutes = require("./routes/offers");

app.use("/offer", offersRoute);
// app.use(offersRoutes);

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
