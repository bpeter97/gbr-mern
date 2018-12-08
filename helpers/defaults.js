const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwt_decode = require("jwt-decode");
const _ = require("lodash");

// models
const User = require("../models/User");

// validation files
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");
const validateUserInput = require("../validation/user");

// @route   POST api/register
// @desc    Registers a new user.
// @access  Public
exports.register = (req, res) => {
  // Fetch validation errors.
  const { errors, isValid } = validateRegisterInput(req.body);

  // send 400 error with validation errors if not valid.
  if (!isValid) return res.status(400).json(errors);

  // Check to see if username exists
  User.findOne({ username: req.body.username }).then(user => {
    // If so, return 400 error with valdiation error
    if (user) {
      errors.username = "Username already exists.";
      return res.status(400).json(errors);

      // Else, check if email is already taken.
    } else {
      User.findOne({ email: req.body.email }).then(user => {
        // If so, return 400 error with valdiation error.
        if (user) {
          errors.email = "Email already exists.";
          return res.status(400).json(errors);

          // else continue with registration.
        } else {
          // Declare new user object
          const newUser = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            middleInitial: req.body.middleInitial,
            suffix: req.body.suffix,
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            phone: req.body.phone,
            title: req.body.title,
            type: req.body.type,
            validated: false
          });

          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        }
      });
    }
  });
};

// @route   POST api/login
// @desc    Logs a user in.
// @access  Public
exports.login = (req, res) => {
  // Fetch validation errors.
  const { errors, isValid } = validateLoginInput(req.body);

  // send 400 error with validation errors if not valid.
  if (!isValid) return res.status(400).json(errors);

  // setup username, password, and generic login errors.
  const username = req.body.username;
  const password = req.body.password;
  const loginError = "Wrong username/password combination";

  // find the user with that username
  User.findOne({ username })
    .then(user => {
      // If no user, send 401 with generic login error.
      if (!user) {
        errors.login = loginError;
        return res.status(401).json(errors);
      }

      // check to see if password matches
      bcrypt.compare(password, user.password).then(isMatch => {
        // If it matches, setup payload for JWT, sign the token, and send it.
        if (isMatch) {
          if (user.validated == true) {
            let token = user.generateAuthToken();
            res.json({ success: true, token });
          } else {
            errors.login = "Your account is not validated yet";
            return res.status(401).json(errors);
          }

          // else, send back 401 error and generic login error
        } else {
          errors.login = loginError;
          return res.status(401).json(errors);
        }
      });
    })
    .catch(e => res.status(400).json(e));
};

// @route   GET api/profile
// @desc    Retrieves a users information.
// @access  Public
exports.getProfile = (req, res) => {
  // decode logged in user information
  const user = jwt_decode(req.token);

  // Return the users information
  res.json(user);
};

// @route   GET api/profile
// @desc    Retrieves a users information.
// @access  Public
exports.patchProfile = (req, res) => {
  // Fetch validation errors.
  const { errors, isValid } = validateUserInput(req.body);

  // send 400 error with validation errors if not valid.
  if (!isValid) return res.status(400).json(errors);

  // decode logged in user information
  const user = jwt_decode(req.token);

  // Get the inputs
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
  body._id = user._id;

  User.findByIdAndUpdate(user._id, { $set: body }, { new: true })
    .then(user => {
      if (!user) {
        errors.user = "Unable to find and update the user";
        return res.status(404).json(errors);
      }
      // Return the newly modified user.
      res.json(user);
    })
    .catch(e => res.status(400).json(e));
};
