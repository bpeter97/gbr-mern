require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// require the routes
const defaults = require("./server/routes/api/defaults");
const products = require("./server/routes/api/products");
const customers = require("./server/routes/api/customers");
const containers = require("./server/routes/api/containers");
const users = require("./server/routes/api/users");
const events = require("./server/routes/api/events");
const settings = require("./server/routes/api/settings");
const todos = require("./server/routes/api/todos");
const quotes = require("./server/routes/api/quotes");

// middleware
const authorization = require("./server/middleware/authorization");

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
app.use("/api/products", authorization, products);
app.use("/api/customers", authorization, customers);
app.use("/api/containers", authorization, containers);
app.use("/api/users", authorization, users);
app.use("/api/events", authorization, events);
app.use("/api/settings", authorization, settings);
app.use("/api/todos", authorization, todos);
app.use("/api/quotes", authorization, quotes);

// Start the server
app.listen(port, () => console.log(`Server running on port ${port}`));

// export app for tests.
module.exports = { app };
