const validator = require("validator");
const isEmpty = require("./is-empty");
const { ObjectID } = require("mongodb");

module.exports = function validateOrderInput(data) {
  // initialize errors
  let errors = {};

  // Set data values to blanks if they're empty.
  data.name = !isEmpty(data.name) ? data.name : "";

  if (validator.isEmpty(data.name)) {
    errors.name = "Name is required";
  }

  // Return errors and a property called isValid.
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
