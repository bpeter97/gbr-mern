const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
    minlength: 4,
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
    type: String,
    minlength: 10,
    maxlength: 10,
    required: true
  },
  title: {
    type: String
  },
  type: {
    type: String,
    required: true
  }
});

// Export the newly created model.
module.exports = User = mongoose.model("User", UserSchema);
