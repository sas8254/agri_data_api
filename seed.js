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
const seedDB = async () => {
  await AgriData.deleteMany({});
  for (let i = 0; i < 20; i++) {
    data = new AgriData({
      amp: Math.random(),
      h1: Math.random(),
      h2: Math.random(),
      mp1: Math.random(),
      mp2: Math.random(),
      t1: Math.random(),
      t2: Math.random(),
    });
    await data.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
