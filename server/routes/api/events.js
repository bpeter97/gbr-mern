const express = require("express");
const router = express.Router();

const helpers = require("./../../helpers/events");

// @route   api/events/
// @GET     Retrieves all of the events
// @POST    Creates a new event.
// @access  Private
router
  .route("/")
  .get(helpers.getEvents)
  .post(helpers.postEvent);

// @route   api/events/:id
// @GET     Retrieves a single event.
// @PATCH   Updates all or part of a single event.
// @DELETE  Deletes a single event from the database.
// @access  Private
router
  .route("/:id")
  .get(helpers.getEvent)
  .patch(helpers.postEvent)
  .delete(helpers.deleteEvent);
