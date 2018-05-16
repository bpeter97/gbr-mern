const { ObjectID } = require("mongodb");
const _ = require("lodash");
const isEmpty = require("./../validation/is-empty");

// model
const Customer = require("./../models/Customer");

// validation files
// const validateCalendarInput = require("../validation/calendar");

// @route   GET api/customers/
// @desc    Retrieves all of the customers
// @access  Private
exports.getCustomers = (req, res) => {};

// @route   POST api/customers/
// @desc    Creates a new customer.
// @access  Private
exports.postCustomer = (req, res) => {};

// @route   GET api/customers/:id
// @desc    Retrieves a single customer.
// @access  Private
exports.getCustomer = (req, res) => {};

// @route   PATCH api/customers/:id
// @desc    Updates all or part of a single customer.
// @access  Private
exports.patchCustomer = (req, res) => {};

// @route   DELETE api/customers/:id
// @desc    Deletes a single customer from the database.
// @access  Private
exports.deleteCustomer = (req, res) => {};
