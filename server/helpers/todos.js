const { ObjectID } = require("mongodb");
const bcrypt = require("bcryptjs");
const _ = require("lodash");
const jwt_decode = require("jwt-decode");

// models
const Todo = require("../models/Todo");

// validation files
const validateTodoInput = require("../validation/todo");

// @route   api/todos/
// @GET     Retrieves all of the user's todos.
// @access  Private
exports.getTodos = (req, res) => {
  var decoded = jwt_decode(req.token);
};

// @route   api/todos/
// @POST    Creates a new Todo.
// @access  Private

// @route   GET api/users/:id
// @GET     Retrieves a single todo.
// @access  Private

// @route   GET api/users/:id
// @PATCH   Updates a single todo.
// @access  Private

// @route   GET api/users/:id
// @DELETE  Deletes a todo.
// @access  Private
