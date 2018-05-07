const validator = require("validator");
const isEmpty = require("./is-empty");
const { ObjectID } = require("mongodb");

module.exports = function validateContainerInput(type, data) {
  // initialize errors
  let errors = {};

  switch (type) {
    case "container":
      // Set data values to blanks if they're empty.
      data.gbrNumber = !isEmpty(data.gbrNumber) ? data.gbrNumber : "";
      data.releaseNumber = !isEmpty(data.releaseNumber)
        ? data.releaseNumber
        : "";
      data.serialNumber = !isEmpty(data.serialNumber) ? data.serialNumber : "";
      data.rentalResale = !isEmpty(data.rentalResale) ? data.rentalResale : "";

      if (validator.isEmpty(data.rentalResale)) {
        errors.rentalResale = "Select rental or resale";
      }

      if (!validator.isBoolean(String(data.hasShelves))) {
        errors.hasShelves =
          "You must select whether the container has shelves or not";
      }

      if (!validator.isBoolean(String(data.isPainted))) {
        errors.isPainted =
          "You must select whether the container is painted or not";
      }

      if (!validator.isBoolean(String(data.hasOnBoxNumbers))) {
        errors.hasOnBoxNumbers =
          "You must select whether the container has GBR numbers or not";
      }

      if (!validator.isBoolean(String(data.hasSigns))) {
        errors.hasSigns =
          "You must select whether the container has signs or not";
      }

      break;
    case "containerSize":
      // Set data values to blanks if they're empty.
      data.size = !isEmpty(data.size) ? data.size : "";

      // Check to see if size has validation errors.
      if (validator.isEmpty(data.size)) {
        errors.size = "Size is required";
      }
      break;
    case "containerShortName":
      // Set data values to blanks if they're empty.
      data.shortName = !isEmpty(data.shortName) ? data.shortName : "";

      // Check to see if shortName has validation errors.
      if (validator.isEmpty(data.shortName)) {
        errors.shortName = "Short name is required";
      }
      break;
    case "updateContainer":
      // Set data values to blanks if they're empty.
      data.gbrNumber = !isEmpty(data.gbrNumber) ? data.gbrNumber : "";
      data.releaseNumber = !isEmpty(data.releaseNumber)
        ? data.releaseNumber
        : "";
      data.serialNumber = !isEmpty(data.serialNumber) ? data.serialNumber : "";
      data.rentalResale = !isEmpty(data.rentalResale) ? data.rentalResale : "";
      data.currentAddress = !isEmpty(data.currentAddress)
        ? data.currentAddress
        : "";
      data.currentlyRented = !isEmpty(data.currentlyRented)
        ? data.currentlyRented
        : "";

      // Check to see if currentAddress has validation errors.
      if (validator.isEmpty(data.currentAddress)) {
        errors.currentAddress = "Current address is required";
      }

      // Check to see if currentlyRented has validation errors.
      if (!validator.isBoolean(String(data.currentlyRented))) {
        errors.currentlyRented =
          "You must select whether the container is currently rented";
      }

      if (validator.isEmpty(data.rentalResale)) {
        errors.rentalResale = "Select rental or resale";
      }

      if (!validator.isBoolean(String(data.hasShelves))) {
        errors.hasShelves =
          "You must select whether the container has shelves or not";
      }

      if (!validator.isBoolean(String(data.isPainted))) {
        errors.isPainted =
          "You must select whether the container is painted or not";
      }

      if (!validator.isBoolean(String(data.hasOnBoxNumbers))) {
        errors.hasOnBoxNumbers =
          "You must select whether the container has GBR numbers or not";
      }

      if (!validator.isBoolean(String(data.hasSigns))) {
        errors.hasSigns =
          "You must select whether the container has signs or not";
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
