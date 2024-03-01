const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const router = express.Router();
const { User } = require("../db");
const JWT_SECRET = require("../config");

router.post("/signup", async (req, res) => {
  const existingUser = await User.findOne({ username: req.body.username });
  if (existingUser) {
    return res.status(411).json({ message: "Email already taken" });
  }

  const user = await User({
    username: req.body.username,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  });

  const hashedPass = await user.createHash(req.body.password);
  user.password = hashedPass;

  await user.save();

  const token = jwt.sign({ userId: user._id }, JWT_SECRET);

  return res.json({
    message: "User created successfully",
    token: token,
  });
});

router.post("/signin", async (req, res) => {
  const signedInUser = await User.findOne({
    username: req.body.username,
  });

  if (!signedInUser) {
    return res.status(411).json({
      message: "Error while logging in",
    });
  }

  if (await signedInUser.validatePassword(req.body.password)) {
    const token = jwt.sign({ userId: signedInUser._id }, JWT_SECRET);

    return res.status(200).json({
      token,
    });
  } else {
    return res.status(411).json({
      message: "Wrong password",
    });
  }
});

module.exports = router;
