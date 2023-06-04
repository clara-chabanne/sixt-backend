const mongoose = require("mongoose");
import { isEmail, isNumeric, isURL } from "validator";

const Reservation = mongoose.model("Reservation", {
  user: {
    identity: {
      genre: String,
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      birthday: {
        day: Number,
        month: Number,
        year: Number,
      },
    },
    contacts: {
      email: { type: String, required: true, validate: [isEmail, "Invalid email"] },
      phone: {
        countryCode: { type: Number, required: true },
        number: { type: Number, required: true, validate: [isNumeric, "Invalid phone number"] },
      },
      address: {
        street: String,
        zipCode: { type: Number, validate: [isNumeric, "Invalid zipcode"] },
        city: String,
        country: String,
      },
    },
    company: String,
  },

  reservation: {
    reference: String,
    agency: {
      pickupAgency: {
        externalId: String,
        name: String,
      },
      returnAgency: {
        externalId: String,
        name: String,
      },
    },
    date: {
      pickupDate: Date,
      returnDate: Date,
      numberOfDays: Number,
    },
    offerInformations: {
      pricePerDay: {
        reservation: {
          price: Number,
          unit: String,
        },
        extraFees: Array,
        additionnalCharges: Array,
        includedCharges: Array,
      },
      headlines: {
        externalId: String,
        description: String,
        shortSubline: String,
        longSubline: String,
        mileAgeInfo: String,
        imageUrl: { type: String, validate: [isURL, "Invalid url"] },
      },
    },
  },
});

module.exports = Reservation;
