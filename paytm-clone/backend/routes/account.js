const express = require("express");
const authMiddleware = require("../middleware");
const { Account } = require("../db");
const router = express.Router();

router.get("/balance", authMiddleware, async (req, res) => {
  const { balance } = await Account.findOne({ userId: req.userId });

  return res.status(200).json({
    balance,
  });
});

module.exports = router;
