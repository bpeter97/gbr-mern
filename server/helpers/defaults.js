const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// models
const User = require("../models/User");

// validation files
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

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
  User.findOne({ username }).then(user => {
    // If no user, send 404 with generic login error.
    if (!user) {
      errors.login = loginError;
      return res.status(404).json(errors);
    }

    // check to see if password matches
    bcrypt.compare(password, user.password).then(isMatch => {
      // If it matches, setup payload for JWT, sign the token, and send it.
      if (isMatch) {
        // the payload - same as user except without password prop
        const payload = {
          firstName: user.firstName,
          lastName: user.lastName,
          middleInitial: user.middleInitial,
          suffix: user.suffix,
          username: user.username,
          email: user.email,
          phone: user.phone,
          title: user.title,
          type: user.type
        };

        // sign and send the token
        jwt.sign(
          payload,
          process.env.secretKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token
            });
          }
        );

        // else, send back 400 error and generic login error
      } else {
        errors.password = loginError;
        return res.status(400).json(errors);
      }
    });
  });
};
