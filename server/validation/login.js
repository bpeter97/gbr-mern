const validator = require("validator");
const isEmpty = require("./is-empty");

// this function will validate the input fields for the login page
module.exports = function validateLoginInput(data) {
  // initialize errors, will be returned.
  let errors = {};

  // Set data values to blanks if they're empty.
  data.username = !isEmpty(data.username) ? data.username : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  // Check to see if username has validation errors.
  if (validator.isEmpty(data.username)) {
    errors.username = "Username is required.";
  }

  // Check to see if password has validation errors.
  if (validator.isEmpty(data.password)) {
    errors.password = "Password is required.";
  }

  // Return errors and a property called isValid.
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
