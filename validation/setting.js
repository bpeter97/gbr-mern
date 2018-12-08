const validator = require("validator");
const isEmpty = require("./is-empty");

// This validation will be used in the settings route for the back end API
module.exports = function validateSettingInput(option, data) {
  // initialize errors, will be returned.
  let errors = {};

  switch (option) {
    case "purchaseType":
      // Check to see if type has validation errors.
      if (validator.isEmpty(data.type)) {
        errors.type = "Purchase type is required";
      }
      break;

    default:
      break;
  }

  // Return errors and a property called isValid.
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
