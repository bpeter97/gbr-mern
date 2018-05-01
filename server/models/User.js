const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create the user Schema
const UserSchema = new Schema({
  firstName: {
    type: "String",
    minlength: 2,
    required: true
  },
  lastName: {
    type: "String",
    minlength: 2,
    required: true
  },
  middleInitial: {
    type: "String",
    minlength: 1
  },
  suffix: {
    type: "String",
    minlength: 2
  },
  username: {
    type: "String",
    minlength: 4,
    required: true
  },
  password: {
    type: "String",
    minlength: 6,
    required: true
  },
  email: {
    type: "String",
    minlength: 5,
    required: true
  },
  phone: {
    type: "String",
    minlength: 10,
    required: true
  },
  title: {
    type: "String",
    minlength: 3
  },
  type: {
    type: "String",
    required: true
  },
  tokens: [
    {
      auth: {
        type: "String"
      },
      token: {
        type: "String"
      }
    }
  ]
});

// Export the newly created model.
module.exports = User = mongoose.model("User", UserSchema);
