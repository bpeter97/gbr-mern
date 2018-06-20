const { ObjectID } = require("mongodb");
const bcrypt = require("bcryptjs");
const _ = require("lodash");

// models
const User = require("../models/User");

// validation files
const validateUserInput = require("../validation/user");

// @route   GET api/users/
// @desc    Retrieves all of the users
// @access  Private
exports.getUsers = (req, res) => {
  User.find({})
    .then(users => {
      if (!users) {
        return res.send("No users found.");
      }
      res.json(users);
    })
    .catch(e => res.status(404).json(e));
};

// @route   POST api/users/
// @desc    Registers a new user.
// @access  Private
exports.postUser = (req, res) => {
  // Fetch validation errors.
  const { errors, isValid } = validateUserInput(req.body);

  // send 400 error with validation errors if not valid.
  if (!isValid) return res.status(400).json(errors);

  var body = _.pick(req.body, [
    "firstName",
    "lastName",
    "middleInitial",
    "suffix",
    "username",
    "password",
    "email",
    "phone",
    "title",
    "type",
    "validated"
  ]);

  // Check to see if username exists
  User.findOne({ username: body.username }).then(user => {
    // If so, return 400 error with valdiation error
    if (user) {
      errors.username = "Username already exists.";
      return res.status(400).json(errors);

      // Else, check if email is already taken.
    } else {
      User.findOne({ email: body.email }).then(user => {
        // If so, return 400 error with valdiation error.
        if (user) {
          errors.email = "Email already exists.";
          return res.status(400).json(errors);

          // else continue with registration.
        } else {
          // Declare new user object
          const newUser = new User({
            firstName: body.firstName,
            lastName: body.lastName,
            middleInitial: body.middleInitial,
            suffix: body.suffix,
            username: body.username,
            password: body.password,
            email: body.email,
            phone: body.phone,
            title: body.title,
            type: body.type,
            validated: body.validated
          });

          // Hash and salt the password and save the user.
          bcrypt.genSalt(10, (err, salt) => {
            // Now hash the password with the salt.
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              // Assign the newly hashed password to the new User object
              newUser.password = hash;

              // Now save it to the database.
              newUser
                .save()
                .then(user => res.json(user))
                .catch(err => console.log(err));
            });
          });
        }
      });
    }
  });
};

// @route   GET api/users/:id
// @desc    Retrieves a single users information.
// @access  Private
exports.getUser = (req, res) => {
  errors = {};

  // Check to see if error is a valid ObjectID
  if (!ObjectID.isValid(req.params.id)) {
    errors.user = "There was no user found";
    return res.status(400).json(errors);
  }

  // Find the object in the DB!
  User.findById(req.params.id)
    .then(user => {
      if (!user) {
        errors.user = "There was no user found";
        return res.status(400).json(errors);
      }

      res.json(user);
    })
    .catch(e => console.log(e));
};

// @route   PATCH api/users/:id
// @desc    Updates all or part of a single users information.
// @access  Private
exports.patchUser = (req, res) => {
  // Fetch validation errors.
  const { errors, isValid } = validateUserInput(req.body);

  // send 400 error with validation errors if not valid.
  if (!isValid || !ObjectID.isValid(req.params.id)) {
    if (!ObjectID.isValid(req.params.id)) {
      errors.user = "There was no user found";
    }
    return res.status(400).json(errors);
  }

  var body = _.pick(req.body, [
    "firstName",
    "lastName",
    "middleInitial",
    "suffix",
    "username",
    "password",
    "email",
    "phone",
    "title",
    "type",
    "validated"
  ]);
  body._id = req.params.id;

  // Check to see if username exists
  User.findByIdAndUpdate(body._id, { $set: body }, { new: true })
    .then(user => {
      if (!user) {
        errors.user = "Unable to find and update the user";
        return res.status(404).json(errors);
      }
      // Return the newly modified user.
      res.json(user);
    })
    .catch(e => res.status(400).send());
};

// @route   DELETE api/users/:id
// @desc    Deletes a single user from the database.
// @access  Private
exports.deleteUser = (req, res) => {
  errors = {};

  // Check to see if error is a valid ObjectID
  if (!ObjectID.isValid(req.params.id)) {
    errors.user = "There was no user found";
    return res.status(400).json(errors);
  }

  // Find the user by ID and remove them.
  User.findByIdAndRemove(req.params.id)
    .then(user => {
      // user was not found!
      if (!user) {
        errors.user = "Unable to find and remove the user";
        res.status(404).json(errors);
      }
      // Return the user that was just removed.
      res.json(user);
    })
    .catch(e => res.status(400).send());
};
