const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AgriData = new Schema(
  {
    amp: String,
    h1: String,
    h2: String,
    mp1: String,
    mp2: String,
    t1: String,
    t2: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("AgriData", AgriData);
