const validator = require("validator");
const isEmpty = require("./is-empty");

// This validation will be used in the register route for the back end API
module.exports = function validateUserInput(data) {
  // initialize errors, will be returned.
  let errors = {};

  // Set data values to blanks if they're empty.
  data.firstName = !isEmpty(data.firstName) ? data.firstName : "";
  data.lastName = !isEmpty(data.lastName) ? data.lastName : "";
  data.middleInitial = !isEmpty(data.middleInitial) ? data.middleInitial : "";
  data.suffix = !isEmpty(data.suffix) ? data.suffix : "";
  data.username = !isEmpty(data.username) ? data.username : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.phone = !isEmpty(data.phone) ? data.phone : "";
  data.title = !isEmpty(data.title) ? data.title : "";
  data.type = !isEmpty(data.type) ? data.type : "";
  data.validated = !isEmpty(data.validated) ? data.validated : "";

  // Check to see if firstName has validation errors.
  if (validator.isEmpty(data.firstName)) {
    errors.firstName = "First name is required";
  }

  if (!validator.isLength(data.firstName, { min: 2, max: 20 })) {
    errors.firstName = "First name must be between 2 and 20 characters";
  }

  // Check to see if lastName has validation errors.
  if (validator.isEmpty(data.lastName)) {
    errors.lastName = "Last name is required";
  }

  if (!validator.isLength(data.lastName, { min: 2, max: 20 })) {
    errors.lastName = "Last name must be between 2 and 20 characters";
  }

  // Check to see if middleInitial has validation errors.
  if (
    !validator.isEmpty(data.middleInitial) &&
    !validator.isLength(data.middleInitial, { min: 1, max: 1 })
  ) {
    errors.middleInitial = "Middle initial must only be 1 character";
  }

  // Check to see if suffix has validation errors.
  if (
    !validator.isEmpty(data.suffix) &&
    !validator.isLength(data.suffix, { min: 2, max: 4 })
  ) {
    errors.suffix = "Suffix must be between 2 and 4";
  }

  // Check to see if username has validation errors.
  if (validator.isEmpty(data.username)) {
    errors.username = "Username is required";
  } else if (!validator.isLength(data.username, { min: 4, max: 20 })) {
    errors.username = "Username must be between 4 and 20 characters";
  }

  // Check to see if password has validation errors.
  if (validator.isEmpty(data.password)) {
    errors.password = "Password is required";
  } else if (!validator.isLength(data.password, { min: 6 })) {
    errors.password = "Password must be more than 6 characters";
  }

  // Check to see if email has validation errors.
  if (validator.isEmpty(data.email)) {
    errors.email = "Email is required";
  } else if (!validator.isEmail(data.email)) {
    errors.email = "Must enter a valid email";
  }

  // Check to see if phone has validation errors.
  if (validator.isEmpty(data.phone)) {
    errors.phone = "Phone is required";
  } else if (!(validator.isInt(data.phone) && data.phone.length == 10)) {
    errors.phone =
      "Must contain 10 digits, no dashes or parenthesis. ex: 5591234567";
  }

  // Check to see if title has validation errors.
  if (
    !validator.isEmpty(data.title) &&
    !validator.isLength(data.title, { min: 3 })
  ) {
    errors.title = "Title must be at least 3 characters";
  }

  // Check to see if type has validation errors.
  if (validator.isEmpty(data.type)) {
    errors.type = "Type is required";
  }

  // Check to see if currentlyRented has validation errors.
  if (!validator.isBoolean(String(data.validated))) {
    errors.validated = "You must select whether the user is validated";
  }

  // Return errors and a property called isValid.
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
