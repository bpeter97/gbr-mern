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

      if (data.hasShelves != typeof Boolean) {
        errors.hasShelves =
          "You must select whether the container has shelves or not";
      }

      if (data.isPainted != typeof Boolean) {
        errors.isPainted =
          "You must select whether the container is painted or not";
      }

      if (data.hasOnBoxNumbers != typeof Boolean) {
        errors.hasOnBoxNumbers =
          "You must select whether the container has GBR numbers or not";
      }

      if (data.hasSigns != typeof Boolean) {
        errors.hasSigns =
          "You must select whether the container has signs or not";
      }

      if (isEmpty(data.shortName) || !ObjectID.isValid(data.shortName)) {
        errors.shortName =
          "You must select a short name or add a new one if it is not listed";
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
    case "containerStats":
      // Set data values to blanks if they're empty.
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
      if (data.currentlyRented != typeof Boolean) {
        errors.currentlyRented =
          "You must select whether the container is currently rented";
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
