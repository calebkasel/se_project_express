const express = require("express");

const mongoose = require("mongoose");

const { PORT = 3001 } = process.env;
const app = express();
const routes = require("./routes");

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db");

app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: "7265712e757365722e5f6964",
  };
  next();
});

app.use(routes);

app.listen(PORT, () => {
  console.log(`App is listening at port ${PORT}`);
  console.log("This is working");
});
