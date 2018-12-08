const express = require("express");
const router = express.Router();

const helpers = require("../../helpers/defaults");

// middleware
const authorization = require("./../../middleware/authorization");

// @route   POST api/login
// @desc    Logs a user in.
// @access  Public
router.route("/login").post(helpers.login);

// @route   POST api/register
// @desc    Registers a new user.
// @access  Public
router.route("/register").post(helpers.register);

// @route   api/profile
// @GET     Retrieves logged in users information.
// @POST    Updates the logged in users information.
// @access  Private
router
  .route("/profile")
  .get(authorization, helpers.getProfile)
  .patch(authorization, helpers.patchProfile);

module.exports = router;
