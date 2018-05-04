require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// require the routes
const defaults = require("./server/routes/api/defaults");

// Set the port if no environment port is set.
const port = process.env.PORT || 5000;

const app = express();

// Use the body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// connect to DB, if NODE_ENV is testing, then use test DB
if (process.env.NODE_ENV == "test") {
  mongoose.connect(process.env.mongoTestURI).catch(err => console.log(err));
} else {
  mongoose
    .connect(process.env.mongoURI)
    .then(() => console.log("MongoDB Connected."))
    .catch(err => console.log(err));
}

// Assign routes!
app.use("/api", defaults);

// Start the server
app.listen(port, () => console.log(`Server running on port ${port}`));

// export app for tests.
module.exports = { app };
