const { ObjectID } = require("mongodb");
const bcrypt = require("bcryptjs");
const _ = require("lodash");
const jwt_decode = require("jwt-decode");

// models
const Todo = require("../models/Todo");

// validation files
const validateTodoInput = require("../validation/todo");

// @route   GET api/todos/
// @desc    Retrieves all of the user's todos.
// @access  Private
exports.getTodos = (req, res) => {
  let errors = {};

  const user = jwt_decode(req.token);

  Todo.find({ creator: new ObjectID(user._id) })
    .then(todos => {
      if (!todos) {
        errors.todos = "There were no todo's found for this user";
        return res.status(400).json(errors);
      }

      res.json({ todos });
    })
    .catch(e => res.status(404).json(e));
};

// @route   POST api/todos/
// @desc    Creates a new Todo.
// @access  Private
exports.postTodo = (req, res) => {
  // Fetch validation errors.
  const { errors, isValid } = validateTodoInput(req.body);

  // send 400 error with validation errors if not valid.
  // if (!isValid || !ObjectID.isValid(req.params.id)) {
  //   if (!ObjectID.isValid(req.params.id)) {
  //     debugger;
  //     errors.todo = "Todo not valid";
  //   }
  //   return res.status(400).json(errors);
  // }

  const user = jwt_decode(req.token);

  var body = {
    desc: req.body.desc,
    creator: new ObjectID(user._id)
  };

  const todo = new Todo(body);

  todo
    .save()
    .then(todo => res.json({ todo }))
    .catch(e => res.status(404).json(e));
};

// @route   GET api/users/:id
// @desc    Retrieves a single todo.
// @access  Private
exports.getTodo = (req, res) => {
  var errors = {};

  // Check to see if error is a valid ObjectID
  if (!ObjectID.isValid(req.params.id)) {
    errors.todo = "There was no todo found";
    return res.status(400).json(errors);
  }

  const user = jwt_decode(req.token);

  Todo.findById(req.params.id)
    .then(todo => {
      if (todo.creator != user._id) {
        errors.user = "You cannot access this todo";
        return res.status(401).json(errors);
      }

      res.json({ todo });
    })
    .catch(e => res.status(404).json(e));
};

// @route   PATCH api/users/:id
// @desc    Updates a single todo.
// @access  Private
exports.patchTodo = (req, res) => {
  var body = _.pick(req.body, ["desc", "completed"]);
  var user = jwt_decode(req.token);

  // Fetch validation errors.
  const { errors, isValid } = validateTodoInput(req.body);

  // Check to see if error is a valid ObjectID
  if (!ObjectID.isValid(req.params.id)) {
    errors.todo = "There was no todo found";
    return res.status(400).json(errors);
  }

  // If todo is completed, set completedAt time.
  if (body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  // Update the todo.
  Todo.findOneAndUpdate(
    {
      _id: req.params.id,
      creator: user._id
    },
    { $set: body },
    { new: true }
  )
    .then(todo => {
      if (!todo) {
        errors.todo = "Unable to update the todo";
        return res.status(400).json(errors);
      }

      res.json({ todo });
    })
    .catch(e => res.status(404).json(e));
};

// @route   DELETE api/users/:id
// @desc    Deletes a todo.
// @access  Private
exports.deleteTodo = (req, res) => {
  let errors = {};
  var user = jwt_decode(req.token);

  // Check to see if error is a valid ObjectID
  if (!ObjectID.isValid(req.params.id)) {
    errors.todo = "There was no todo found";
    return res.status(400).json(errors);
  }

  Todo.findOneAndRemove({
    _id: req.params.id,
    creator: user._id
  })
    .then(todo => {
      if (!todo) {
        errors.todo = "Unable to delete the todo";
        return res.status(400).json(errors);
      }

      res.json({ todo });
    })
    .catch(e => res.status(404).json(e));
};
