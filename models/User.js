const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Create the user Schema
const UserSchema = new Schema({
  firstName: {
    type: String,
    minlength: 2,
    maxlength: 20,
    required: true
  },
  lastName: {
    type: String,
    minlength: 2,
    maxlength: 20,
    required: true
  },
  middleInitial: {
    type: String
  },
  suffix: {
    type: String
  },
  username: {
    type: String,
    minlength: 3,
    maxlength: 20,
    required: true
  },
  password: {
    type: String,
    minlength: 6,
    required: true
  },
  email: {
    type: String,
    minlength: 5,
    required: true
  },
  phone: {
    type: Number,
    required: true
  },
  title: {
    type: String
  },
  type: {
    type: String,
    required: true
  },
  validated: {
    type: Boolean,
    required: true,
    default: false
  }
});

UserSchema.statics.findByToken = function(token) {
  var User = this;
  var decoded;

  try {
    decoded = jwt.verify(token, process.env.secretKey);
  } catch (e) {
    return Promise.reject();
  }

  return User.findById(decoded._id);
};

UserSchema.methods.generateAuthToken = function() {
  var user = this;
  var access = "auth";
  var token = jwt
    .sign(
      {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        middleInitial: user.middleInitial,
        suffix: user.suffix,
        username: user.username,
        email: user.email,
        phone: user.phone,
        title: user.title,
        type: user.type,
        validated: user.validated
      },
      process.env.secretKey,
      { expiresIn: 3600 }
    )
    .toString();

  return token;
};

UserSchema.pre("save", function(next) {
  var user = this;

  if (user.isModified("password")) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

// Export the newly created model.
module.exports = User = mongoose.model("User", UserSchema);
