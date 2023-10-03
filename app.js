const express = require("express");
const mongoose = require("mongoose");
const { PORT = 3001 } = process.env;
const app = express();
const routes = require("./routes");

mongoose.connect(
  "mongodb://127.0.0.1:27017/wtwr_db",
  (r) => {
    console.log("connected to DB");
  },
  (e) => {
    console.log("db error", e);
  },
);

app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: "651c459ce4452e7bb9b0aa11",
  };
  next();
});

app.use(routes);

app.listen(PORT, () => {
  console.log(`App is listening at port ${PORT}`);
  console.log("This is working");
});