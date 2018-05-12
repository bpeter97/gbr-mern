const validator = require("validator");
const isEmpty = require("./is-empty");
const { ObjectID } = require("mongodb");

// This validation will be used in the register route for the back end API
module.exports = function validateEventInput(data) {
  // initialize errors, will be returned.
  let errors = {};

  // Set data values to blanks if they're empty.
  data.title = !isEmpty(data.title) ? data.title : "";
  data.color = !isEmpty(data.color) ? data.color : "";
  data.start = !isEmpty(data.start) ? data.start : "";
  data.end = !isEmpty(data.end) ? data.end : "";

  // Check to see if title has validation errors.
  if (validator.isEmpty(data.title)) {
    errors.title = "Title is required";
  }

  if (!validator.isLength(data.title, { min: 3 })) {
    errors.title = "Title must be at least 3 characters";
  }

  // Check to see if color has validation errors.
  if (validator.isEmpty(data.color)) {
    errors.color = "Color is required";
  }

  // Check to see if start has validation errors.
  if (validator.isEmpty(data.start)) {
    errors.start = "Start is required";
  }

  // Check to see if end has validation errors.
  if (validator.isEmpty(data.end)) {
    errors.end = "End is required";
  }

  // Return errors and a property called isValid.
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
