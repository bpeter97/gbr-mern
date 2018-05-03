const express = require("express");
const router = express.Router();

const helpers = require('../../helpers/defaults');

// Load Input Validation


// @route   POST api/login
// @desc    Logs a user in.
// @access  Public

// @route   POST api/register
// @desc    Registers a new user.
// @access  Public
router.route('/register')
.post(helpers.register); 

module.exports = router;
