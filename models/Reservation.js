const mongoose = require("mongoose");

const Reservation = mongoose.model("Reservation", {
  creationDate: Date,
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
      email: { type: String, required: true },
      phone: {
        countryCode: { type: Number, required: true },
        number: { type: Number, required: true },
      },
      address: {
        street: String,
        zipCode: { type: Number },
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
          currency: String,
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
        mileageInfo: String,
        imageUrl: { type: String },
      },
    },
  },
});

module.exports = Reservation;
