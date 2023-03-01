if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const AgriData = require("./model/agriData");

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const dbUrl = process.env.DB_URL || "mongodb://127.0.0.1:27017/AgriData";
mongoose
  .connect(dbUrl)
  .then(() => {
    console.log("mongo connection open");
  })
  .catch((e) => {
    console.log("mongo error", e);
  });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/data", async (req, res) => {
  try {
    const agridata = await AgriData.find({});
    res.send(agridata);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

app.post("/data", async (req, res) => {
  try {
    const data = new AgriData(req.body);
    await data.save();
    res.send(data);
  } catch (e) {
    res.send(e.message);
  }
});

const port = process.env.port || 4000;

app.listen(port, () => {
  console.log(`Serving on port ${port}!`);
});
