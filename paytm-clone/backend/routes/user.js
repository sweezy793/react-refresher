const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();
const { User, Account } = require("../db");
const JWT_SECRET = require("../config");
const authMiddleware = require("../middleware");

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

  const initialBalance = Math.floor(Math.random() * 9999) + 1;
  await Account.create({
    userId: user._id,
    balance: initialBalance,
  });

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

router.put("/", authMiddleware, async (req, res) => {
  await User.updateOne({ _id: req.userId }, req.body);

  res.json({
    message: "Updated successfully",
  });
});

router.get("/bulk", async (req, res) => {
  const searchTerm = req.query.filter;

  try {
    const userData = await User.find({
      $or: [
        { firstName: new RegExp(searchTerm, "i") },
        { lastName: new RegExp(searchTerm, "i") },
      ],
    })
      .select("username firstName lastName _id")
      .exec();

    return res.status(200).json({
      users: userData,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
});

module.exports = router;
