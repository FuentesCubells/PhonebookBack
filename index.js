require("dotenv").config();

const bodyParser = require('body-parser')
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const MONGO_CONNECTION = process.env.MONGODB_URI;
const contactRoutes = require("./src/routes/contactsRoutes");

mongoose
  .connect(MONGO_CONNECTION)
  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

app.use("/", contactRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});