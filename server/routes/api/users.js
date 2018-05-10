const express = require("express");
const router = express.Router();

const helpers = require("../../helpers/users");

// @route   api/users/
// @GET     Retrieves all of the users.
// @POST    Registers a new user.
// @access  Private
router
  .route("/")
  .get(helpers.getUsers)
  .post(helpers.postUser);

// @route   GET api/users/:id
// @GET     Retrieves a single users information.
// @PATCH   Updates all or part of a single users information.
// @DELETE  Deletes a single user from the database.
// @access  Private
router
  .route("/:id")
  .get(helpers.getUser)
  .patch(helpers.patchUser)
  .delete(helpers.deleteUser);

module.exports = router;
