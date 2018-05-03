const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

// Load Input Validation
const validateRegisterInput = require("../../validation/register");

// Load User model
const User = require("../../models/User");

// @route   POST api/login
// @desc    Logs a user in.
// @access  Public

// @route   POST api/register
// @desc    Registers a new user.
// @access  Public
router.post("/register", (req, res) => {
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

      // Else, continue with the registration of new user.
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
        type: req.body.type
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
});

module.exports = router;
