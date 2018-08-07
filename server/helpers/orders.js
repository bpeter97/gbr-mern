const { ObjectID } = require("mongodb");
const _ = require("lodash");
const isEmpty = require("./../validation/is-empty");

// model
const Order = require("./../models/Order");

// validation files
const validateOrderInput = require("../validation/order");

// @route   GET api/orders/
// @desc    Retrieves all of the orders
// @access  Private
exports.getOrders = (req, res) => {};

// @route   POST api/orders/
// @desc    Creates a new order.
// @access  Private
exports.postOrder = (req, res) => {};

// @route   GET api/orders/:id
// @desc    Retrieves a single order.
// @access  Private
exports.getOrder = (req, res) => {};

// @route   PATCH api/orders/:id
// @desc    Updates all or part of a single order.
// @access  Private
exports.patchOrder = (req, res) => {};

// @route   DELETE api/orders/:id
// @desc    Deletes a single order from the database.
// @access  Private
exports.deleteOrder = (req, res) => {};
