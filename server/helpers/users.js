const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// models
const User = require("../models/User");

// validation files
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

// @route   GET api/users/
// @desc    Retrieves all of the users
// @access  Private
exports.getUsers = (req, res) => {};

// @route   POST api/users/
// @desc    Registers a new user.
// @access  Private
exports.postUser = (req, res) => {};

// @route   GET api/users/:id
// @desc    Retrieves a single users information.
// @access  Private
exports.getUser = (req, res) => {};

// @route   PATCH api/users/:id
// @desc    Updates all or part of a single users information.
// @access  Private
exports.patchUser = (req, res) => {};

// @route   DELETE api/users/:id
// @desc    Deletes a single user from the database.
// @access  Private
exports.deleteUser = (req, res) => {};
