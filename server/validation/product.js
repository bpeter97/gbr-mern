const validator = require("validator");
const isEmpty = require("./is-empty");

// this function will validate the input fields for the login page
module.exports = function validateProductInput(type, data) {
  // initialize errors, will be returned.
  let errors = {};

  if (type == "productType") {
    // Set data values to blanks if they're empty.
    data.type = !isEmpty(data.type) ? data.type : "";

    // Check to see if type has validation errors.
    if (validator.isEmpty(data.type)) {
      errors.type = "Type is required.";
    }
  } else if (type == "product") {
    return;
  }

  // Return errors and a property called isValid.
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
