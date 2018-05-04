const express = require("express");
const router = express.Router();

const helpers = require("../../helpers/defaults");

// @route   POST api/login
// @desc    Logs a user in.
// @access  Public
router.route("/login").post(helpers.login);

// @route   POST api/register
// @desc    Registers a new user.
// @access  Public
router.route("/register").post(helpers.register);

module.exports = router;
