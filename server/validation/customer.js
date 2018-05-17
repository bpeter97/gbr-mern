const validator = require("validator");
const isEmpty = require("./is-empty");
const { ObjectID } = require("mongodb");

module.exports = function validateCustomerInput(data) {
  // initialize errors
  let errors = {};

  // Set data values to blanks if they're empty.
  data.name = !isEmpty(data.name) ? data.name : "";
  data.address1 = !isEmpty(data.address1) ? data.address1 : "";
  data.address2 = !isEmpty(data.address2) ? data.address2 : "";
  data.city = !isEmpty(data.city) ? data.city : "";
  data.zipcode = !isEmpty(data.zipcode) ? data.zipcode : "";
  data.state = !isEmpty(data.state) ? data.state : "";
  data.phone = !isEmpty(data.phone) ? data.phone : "";
  data.ext = !isEmpty(data.ext) ? data.ext : "";
  data.fax = !isEmpty(data.fax) ? data.fax : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.rdp = !isEmpty(data.rdp) ? data.rdp : "";
  data.notes = !isEmpty(data.notes) ? data.notes : "";
  data.isFlagged = !isEmpty(data.isFlagged) ? data.isFlagged : "";
  data.flagReason = !isEmpty(data.flagReason) ? data.flagReason : "";

  if (validator.isEmpty(data.name)) {
    errors.name = "Name is required";
  }

  if (validator.isEmpty(data.address1)) {
    errors.address1 = "Address is required";
  }

  if (validator.isEmpty(data.citry)) {
    errors.citry = "City is required";
  }

  if (validator.isEmpty(data.zipcode)) {
    errors.zipcode = "Zipcode is required";
  }

  if (validator.isEmpty(data.state)) {
    errors.state = "State is required";
  }

  if (validator.isEmpty(data.phone)) {
    errors.phone = "Phone is required";
  }

  if (!validator.isBoolean(String(data.isFlagged))) {
    errors.isFlagged = "You must select whether the customer has a flag or not";
  }

  // Return errors and a property called isValid.
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
