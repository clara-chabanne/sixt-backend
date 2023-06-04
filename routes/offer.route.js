const express = require("express");
const offerRoute = express.Router();
const axios = require("axios");

// 1. Get location infos
offerRoute.get("/location", async (req, res) => {
  try {
    // Replace spaces with "%20"
    search = req.query.search.replaceAll(" ", "%20");

    // Fetch data from Sixt API
    const { data } = await axios.get(`https://lereacteur-bootcamp-api.herokuapp.com/api/sixt/locations?q=${search}`, {
      headers: {
        Authorization: `Bearer ${process.env.API_KEY}`,
      },
    });

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 2. Get agency offers
offerRoute.get("/agencyoffers", async (req, res) => {
  try {
    // Destructuring
    const { pickupStation, returnStation, pickupDate, returnDate } = req.query;

    // Fetch data from Sixt API
    const { data } = await axios.get(
      `https://lereacteur-bootcamp-api.herokuapp.com/api/sixt/rentaloffers?pickupStation=${pickupStation}&returnStation=${returnStation}&pickupDate=${pickupDate}&returnDate=${returnDate}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.API_KEY}`,
        },
      }
    );

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 3. Get one offer infos
offerRoute.get("/offerinfos", async (req, res) => {
  try {
    // Destructuring
    const { pickupStation, returnStation, pickupDate, returnDate } = req.query;

    // Fetch data from Sixt API
    const { data } = await axios.get(
      `https://lereacteur-bootcamp-api.herokuapp.com/api/sixt/rentaloffers?pickupStation=${pickupStation}&returnStation=${returnStation}&pickupDate=${pickupDate}&returnDate=${returnDate}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.API_KEY}`,
        },
      }
    );

    // Search for the offer
    let offer = undefined;

    for (i = 0; i < data.length; i++) {
      console.log(i);
      if (data[i].id === req.query.offerId) {
        offer = data[i];
      }
    }

    res.status(200).json(offer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 4. Get offer configuration
offerRoute.get("/offerconfiguration", async (req, res) => {
  try {
    // Destructuring
    const { offerId } = req.query;

    // Fetch data from Sixt API
    const { data } = await axios.post(
      `https://lereacteur-bootcamp-api.herokuapp.com/api/sixt/rentalconfigurations/create`,
      { offerId: offerId },
      {
        headers: {
          Authorization: `Bearer ${process.env.API_KEY}`,
        },
      }
    );

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = offerRoute;
