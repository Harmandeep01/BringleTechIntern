const express = require("express");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv").config();
const mongoDb = require("../db/conn");
const User = require("../models/User");
const defineAuth = require("../Middleware/defineAuth");
const app = express();
app.use(express.json());
app.use(cookieParser());
app.get("/", async (_, res) => {
  const data = await User.find({});
  res.status(200).json({
    data,
  });
});

// Signup Route
app.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error signing up" });
  }
});

// Login Route
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).send("Invalid Login Details");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send("Invalid Login Details");
    }
    const token = await user.generateAuthToken();
    res.cookie("jwt", token, {
      expires: new Date(Date.now() + 100000),
      httpOnly: true,
    });
    delete user.password;
    res.json({ user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Protected Route
app.get("/protected", defineAuth, (req, res) => {
  res.json({ message: "This is a protected route", user: req.user });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
