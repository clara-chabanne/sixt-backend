const express = require("express");
const reservationRoute = express.Router();
const axios = require("axios");

const moment = require("moment");

const Reservation = require("../models/Reservation");

// 1. Create reservation
reservationRoute.post("/new", async (req, res) => {
  try {
    // Destructuring infos
    const {
      user: {
        identity: {
          genre,
          firstName,
          lastName,
          birthday: { day, month, year },
        },
        contacts: {
          email,
          phone: { countryCode, number },
          address: { street, zipCode, city, country },
        },
        company,
      },
      reservation: {
        agency: { pickupAgency, returnAgency },
        date: { pickupDate, returnDate, numberOfDays },
        offerInformations: {
          pricePerDay: {
            reservation: { price, currency },
            extraFees,
            additionnalCharges,
            includedCharges,
          },
          headlines: { externalId, description, shortSubline, longSubline, mileageInfo, imageUrl },
        },
      },
    } = req.body;

    // Create reference
    const date = new Date();

    const firstNameLetters = lastName.substring(0, 3).toUpperCase();
    const yearDigits = moment(date).format("YYYY").substring(2, 4);
    const monthDigits = moment(date).format("MM");

    // Set index
    const reservation = await Reservation.find();

    let lastIndex = 0;

    for (let i = 0; i < reservation.length; i++) {
      const creationDate = reservation[i].creationDate;

      if (moment(creationDate).format("YYYY MM") === moment(date).format("YYYY MM")) {
        lastIndex = lastIndex + 1;
      }
    }

    let reservationIndex = lastIndex + 1;

    if (reservationIndex < 10) {
      reservationIndex = "00" + reservationIndex;
    } else if (reservationIndex > 10 && reservationIndex < 100) {
      reservationIndex = "0" + reservationIndex;
    }

    const reference = firstNameLetters + yearDigits + monthDigits + reservationIndex;

    // Create new reservation
    const newReservation = new Reservation({
      creationDate: date,
      user: {
        identity: {
          genre: genre,
          firstName: firstName,
          lastName: lastName,
          birthday: {
            day: day,
            month: month,
            year: year,
          },
        },
        contacts: {
          email: email,
          phone: {
            countryCode: countryCode,
            number: number,
          },
          address: {
            street: street,
            zipCode: zipCode,
            city: city,
            country: country,
          },
        },
        company: company,
      },

      reservation: {
        reference: reference,
        agency: {
          pickupAgency: {
            externalId: pickupAgency.externalId,
            name: pickupAgency.name,
          },
          returnAgency: {
            externalId: returnAgency.externalId,
            name: returnAgency.name,
          },
        },
        date: {
          pickupDate: pickupDate,
          returnDate: returnDate,
          numberOfDays: numberOfDays,
        },
        offerInformations: {
          pricePerDay: {
            reservation: {
              price: price,
              currency: currency,
            },
            extraFees: extraFees,
            additionnalCharges: additionnalCharges,
            includedCharges: includedCharges,
          },
          headlines: {
            externalId: externalId,
            description: description,
            shortSubline: shortSubline,
            longSubline: longSubline,
            mileageInfo: mileageInfo,
            imageUrl: imageUrl,
          },
        },
      },
    });

    await newReservation.save();

    res.status(201).json({ message: "Reservation created with sucess", reference: reference });
    // console.log("Reservation created");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 2. Get reservations
reservationRoute.get("/", async (req, res) => {
  try {
    const reservations = await Reservation.find();

    res.status(201).json(reservations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 3. Delete reservation
reservationRoute.post("/delete", async (req, res) => {
  try {
    await Reservation.findByIdAndDelete(req.body.id);

    res.status(201).json("Reservation deleted");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = reservationRoute;
