const { ObjectID } = require("mongodb");
const _ = require("lodash");
const isEmpty = require("./../validation/is-empty");

// model
const CalendarEvent = require("./../models/CalendarEvent");

// validation files
const validateEventInput = require("../validation/event");

// @route   GET api/events/
// @desc    Retrieves all of the events
// @access  Private
exports.getEvents = (req, res) => {
  CalendarEvent.find({})
    .then(events => {
      if (!events) {
        return res.send("No events found.");
      }
      res.json({ events });
    })
    .catch(e => res.status(404).json(e));
};

// @route   POST api/events/
// @desc    Creates a new event.
// @access  Private
exports.postEvent = (req, res) => {};

// @route   GET api/events/:id
// @desc    Retrieves a single event.
// @access  Private
exports.getEvent = (req, res) => {
  errors = {};

  // Check to see if error is a valid ObjectID
  if (!ObjectID.isValid(req.params.id)) {
    errors.event = "There was no event found";
    return res.status(400).json(errors);
  }

  // Find the object in the DB!
  CalendarEvent.findById(req.params.id)
    .then(event => {
      if (!event) {
        errors.event = "There was no event found";
        return res.status(400).json(errors);
      }

      res.json({ event });
    })
    .catch(e => console.log(e));
};

// @route   PATCH api/events/:id
// @desc    Updates all or part of a single event.
// @access  Private
exports.patchEvent = (req, res) => {};

// @route   DELETE api/events/:id
// @desc    Deletes a single event from the database.
// @access  Private
exports.deleteEvent = (req, res) => {};
