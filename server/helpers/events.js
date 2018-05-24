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
      res.json(events);
    })
    .catch(e => res.status(404).json(e));
};

// @route   POST api/events/
// @desc    Creates a new event.
// @access  Private
exports.postEvent = (req, res) => {
  // Fetch validation errors.
  const { errors, isValid } = validateEventInput(req.body);

  // send 400 error with validation errors if not valid.
  if (!isValid) return res.status(400).json(errors);

  // easily grab posted data
  var body = _.pick(req.body, ["title", "color", "start", "end"]);
  if (req.body.order) {
    body.order = new ObjectID(req.body.order);
  } else {
    body.order = null;
  }

  // create it.
  var newEvent = new CalendarEvent(body);

  // Save it in the DB and return it.
  newEvent
    .save()
    .then(event => {
      res.json(event);
    })
    .catch(e => console.log(e));
};

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

      res.json(event);
    })
    .catch(e => console.log(e));
};

// @route   PATCH api/events/:id
// @desc    Updates all or part of a single event.
// @access  Private
exports.patchEvent = (req, res) => {
  // Fetch validation errors.
  const { errors, isValid } = validateEventInput(req.body);

  if (!isValid || !ObjectID.isValid(req.params.id)) {
    if (!ObjectID.isValid(req.params.id)) {
      errors.event = "There was no event found";
    }
    return res.status(400).json(errors);
  }

  var body = _.pick(req.body, ["title", "color", "start", "end"]);
  body.order = new ObjectID(req.body.order);
  body._id = req.params.id;

  // Check to see if eventname exists
  CalendarEvent.findByIdAndUpdate(body._id, { $set: body }, { new: true })
    .then(event => {
      if (!event) {
        errors.event = "Unable to find and update the event";
        return res.status(404).json(errors);
      }
      // Return the newly modified event.
      res.json(event);
    })
    .catch(e => res.status(400).send());
};

// @route   DELETE api/events/:id
// @desc    Deletes a single event from the database.
// @access  Private
exports.deleteEvent = (req, res) => {
  errors = {};

  // Check to see if error is a valid ObjectID
  if (!ObjectID.isValid(req.params.id)) {
    errors.event = "There was no event found";
    return res.status(400).json(errors);
  }

  // Find the event by ID and remove them.
  CalendarEvent.findByIdAndRemove(req.params.id)
    .then(event => {
      // event was not found!
      if (!event) {
        errors.event = "Unable to find and remove the event";
        res.status(404).json(errors);
      }
      // Return the event that was just removed.
      res.json(event);
    })
    .catch(e => res.status(400).send());
};
