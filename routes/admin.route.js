const express = require("express");
const adminRoute = express.Router();

const uid2 = require("uid2");
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");

const Admin = require("../models/Admin");

// 1- Create admin
adminRoute.post("/new", async (req, res) => {
  try {
    // Destructuring infos envoyés par le user
    const { password } = req.body;

    // Créer un mot de passe sécurisé
    const salt = uid2(16);
    const hash = SHA256(password + salt).toString(encBase64);
    const token = uid2(64);

    // Créer un admin
    const newAdmin = new Admin({
      name: "admin",
      token: token,
      hash: hash,
      salt: salt,
    });

    await newAdmin.save();

    res.status(201).json({
      _id: newAdmin._id,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 2- Login to backoffice
adminRoute.post("/login", async (req, res) => {
  try {
    // Destructuring infos envoyés par le user
    const { password } = req.body;

    // Connect to admin
    const admin = await Admin.findOne({ name: "admin" });
    const token = admin.token;

    // Hash du password entré
    const newHash = SHA256(password + admin.salt).toString(encBase64);

    // Check if password is correct
    if (newHash !== admin.hash) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    res.status(201).json({ message: "You are now connected !", token: token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = adminRoute;
