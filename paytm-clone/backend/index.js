const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const router = require("./routes/index");

const app = express();

mongoose.connect("mongodb://localhost:27017/paytm");

app.use(express.json());
app.use(cors());

app.use("/api/v1", router);

app.listen(3000, () => {
  console.log("Listening on port 3000...");
});
