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
exports.getEvents = (req, res) => {};

// @route   POST api/events/
// @desc    Creates a new event.
// @access  Private
exports.postEvent = (req, res) => {};

// @route   GET api/events/:id
// @desc    Retrieves a single event.
// @access  Private
exports.getEvent = (req, res) => {};

// @route   PATCH api/events/:id
// @desc    Updates all or part of a single event.
// @access  Private
exports.patchEvent = (req, res) => {};

// @route   DELETE api/events/:id
// @desc    Deletes a single event from the database.
// @access  Private
exports.deleteEvent = (req, res) => {};
