const validator = require("validator");
const isEmpty = require("./is-empty");
const { ObjectID } = require("mongodb");

// this function will validate the input fields for the login page
module.exports = function validateProductInput(type, data) {
  // initialize errors, will be returned.
  let errors = {};

  if (type == "productType") {
    // Set data values to blanks if they're empty.
    data.type = !isEmpty(data.type) ? data.type : "";

    // Check to see if type has validation errors.
    if (validator.isEmpty(data.type)) {
      errors.type = "Type is required";
    }
  } else if (type == "product") {
    // Set data values to blanks if they're empty.
    data.name = !isEmpty(data.name) ? data.name : "";
    data.shortName = !isEmpty(data.shortName) ? data.shortName : "";

    // Check to see if name has validation errors.
    if (validator.isEmpty(data.name)) {
      errors.name = "Name is required";
    }

    // Check to see if name has validation errors.
    if (validator.isEmpty(data.shortName)) {
      errors.shortName = "Short name is required";
    }

    // Check to see if rental has validation errors.
    if (isEmpty(data.rental)) {
      errors.rental = "Must select a rental type";
    }

    // Check to see if type has validation errors.
    if (isEmpty(data.type) || !ObjectID.isValid(data.type)) {
      errors.type = "Must select a product type";
    }
  }

  // Return errors and a property called isValid.
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
