const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateTodoInput(data) {
  // initialize errors
  let errors = {};

  // Set data values to blanks if they're empty.
  data.desc = !isEmpty(data.desc) ? data.desc : "";

  // Check to see if todo description has validation errors.
  if (validator.isEmpty(data.desc)) {
    errors.desc = "Todo description is required";
  }

  // Return errors and a property called isValid.
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
