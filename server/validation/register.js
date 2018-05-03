const Validator = require("validator");
const isEmpty = require("./is-empty");

// This validation will be used in the register route for the back end API
module.exports = function validateRegisterInput(data) {
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

  // Check to see if firstName has validation errors.
  if (!Validator.isEmpty(data.firstName)) {
    errors.firstName = "First name is required.";
  } else if (!Validator.isLength(data.firstName, { min: 2, max: 20 })) {
    errors.firstName = "First name must be between 2 and 20 characters.";
  }

  // Check to see if lastName has validation errors.
  if (!Validator.isEmpty(data.lastName)) {
    errors.lastName = "Last name is required.";
  } else if (!Validator.isLength(data.lastName, { min: 2, max: 20 })) {
    errors.lastName = "Last name must be between 2 and 20 characters.";
  }

  // Check to see if middleInitial has validation errors.
  if (
    Validator.isEmpty(
      data.middleInitial &&
        !Validator.isLength(data.middleInitial, { min: 1, max: 1 })
    )
  ) {
    errors.middleInitial = "Middle initial must only be 1 character.";
  }

  // Check to see if suffix has validation errors.
  if (
    Validator.isEmpty(
      data.suffix && !Validator.isLength(data.suffix, { min: 2, max: 4 })
    )
  ) {
    errors.suffix = "Suffix must be between 2 and 4.";
  }

  // Check to see if username has validation errors.
  if (!Validator.isEmpty(data.username)) {
    errors.username = "Username is required.";
  } else if (!Validator.isLength(data.username, { min: 4, max: 20 })) {
    errors.username = "Username must be between 4 and 20 characters.";
  }

  // Check to see if password has validation errors.
  if (!Validator.isEmpty(data.password)) {
    errors.password = "Password is required.";
  } else if (!Validator.isLength(data.password, { min: 6 })) {
    errors.password = "Password must be more than 6 characters";
  }

  // Check to see if email has validation errors.
  if (!Validator.isEmpty(data.email)) {
    errors.email = "Email is required.";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Must enter a valid email.";
  }

  // Check to see if phone has validation errors.
  if (!Validator.isEmpty(data.phone)) {
    errors.phone = "Phone is required.";
  } else if (data.phone.match(/\d/g).length === 10) {
    errors.phone = "Phone must be exactly 10 digits (5591234567).";
  }

  // Check to see if title has validation errors.
  if (
    Validator.isEmpty(data.title && !Validator.isLength(data.title, { min: 3 }))
  ) {
    errors.title = "Title must be at least 3 characters.";
  }

  // Check to see if type has validation errors.
  if (!Validator.isEmpty(data.type)) {
    errors.type = "Type is required.";
  }

  // Return errors and a property called isValid.
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
