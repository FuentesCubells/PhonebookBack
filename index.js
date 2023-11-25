require("dotenv").config();

const bodyParser = require('body-parser')
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require('path');

const app = express();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'], // Accepting all methods
  allowedHeaders: ['Content-Type'],
}));

app.use(bodyParser.json());


app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  // allow preflight
  if (req.method === 'OPTIONS') {
      res.send(200);
  } else {
      next();
  }
});

const MONGO_CONNECTION = process.env.MONGODB_URI;
const contactRoutes = require("./src/routes/contactsRoutes");

mongoose
  .connect(MONGO_CONNECTION)
  .then((result) => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB:", error.message);
  });


// Routes
app.use("/", contactRoutes);
app.use(express.static(path.join(__dirname, 'public')));

// Unknown Endpoint Handler
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'Unknown endpoint' })
}

app.use(unknownEndpoint); // This should be placed after all other route/middleware setups

const PORT = process.env.PORT || 3000; // Set a default port if not provided in the environment
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
