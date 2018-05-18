const express = require("express");
const router = express.Router();

const helpers = require("../../helpers/todos");

// @route   api/todos/
// @GET     Retrieves all of the user's todos.
// @POST    Creates a new Todo.
// @access  Private
router
  .route("/")
  .get(helpers.getTodos)
  .post(helpers.postTodo);

// @route   GET api/users/:id
// @GET     Retrieves a single todo.
// @PATCH   Updates a single todo.
// @DELETE  Deletes a todo.
// @access  Private
router
  .route("/:id")
  .get(helpers.getTodo)
  .patch(helpers.patchTodo)
  .delete(helpers.deleteTodo);

module.exports = router;
