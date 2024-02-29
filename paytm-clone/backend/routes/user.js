const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const { User } = require("../db");
const JWT_SECRET = require("../config");

router.post("/signup", async (req, res) => {
  const existingUser = await User.findOne({ username: req.body.username });
  if (existingUser) {
    return res.status(411).json({ message: "Email already taken" });
  }

  const user = await User.create({
    username: req.body.username,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  });

  const token = jwt.sign({ userId: user._id }, JWT_SECRET);

  return res.json({
    message: "User created successfully",
    token: token,
  });
});

router.post("/signin", async (req, res) => {
  const userExists = await User.findOne({
    username: req.body.username,
    password: req.body.password,
  });

  if (!userExists) {
    return res.status(411).json({
      message: "Error while logging in",
    });
  }

  const token = jwt.sign({ userId: userExists._id }, JWT_SECRET);

  return res.status(200).json({
    token,
  });
});

module.exports = router;
