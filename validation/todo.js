const validator = require("validator");
const isEmpty = require("./is-empty");
const _ = require("lodash");

module.exports = function validateTodoInput(data) {
  // initialize errors
  let errors = {};

  // Set data values to blanks if they're empty.
  data.desc = !isEmpty(data.desc) ? data.desc : "";

  // Check to see if todo description has validation errors.
  if (validator.isEmpty(data.desc)) {
    errors.desc = "Todo description is required";
  }

  if (!isEmpty(data.completed) && !_.isBoolean(data.completed)) {
    errors.completed = "Completed must be true or false";
  }

  // Return errors and a property called isValid.
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
