// Simple function designed to check to see if a value is empty, returns True or False.
const isEmpty = value =>
  // Check if undefined
  value === undefined ||
  // Check if null
  value === null ||
  // Check to see if object is empty
  (typeof value === "object" && Object.keys(value).length === 0) ||
  // Check to see if string has no values
  (typeof value === "string" && value.trim().length === 0);

module.exports = isEmpty;
