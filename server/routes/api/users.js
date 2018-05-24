const express = require("express");
const router = express.Router();

const helpers = require("../../helpers/users");

// middleware
const isAdmin = require("./../../middleware/isAdmin");
const isSelfOrAdmin = require("./../../middleware/isSelfOrAdmin");

// @route   api/users/
// @GET     Retrieves all of the users.
// @POST    Registers a new user.
// @access  Private
router
  .route("/")
  .get(helpers.getUsers)
  .post(isAdmin, helpers.postUser);

// @route   GET api/users/:id
// @GET     Retrieves a single users information.
// @PATCH   Updates all or part of a single users information.
// @DELETE  Deletes a single user from the database.
// @access  Private
router
  .route("/:id")
  .get(helpers.getUser)
  .patch(isSelfOrAdmin, helpers.patchUser)
  .delete(isAdmin, helpers.deleteUser);

module.exports = router;
