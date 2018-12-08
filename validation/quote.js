const validator = require("validator");
const isEmpty = require("./is-empty");
const { ObjectID } = require("mongodb");

module.exports = function validateQuoteInput(data) {
  // initialize errors
  let errors = {};

  // Set data values to blanks if they're empty.
  data.customer = !isEmpty(data.customer) ? data.customer : "";
  data.purchaseType = !isEmpty(data.purchaseType) ? data.purchaseType : "";
  data.attention = !isEmpty(data.attention) ? data.attention : "";
  data.priceBeforeTax = !isEmpty(data.priceBeforeTax)
    ? data.priceBeforeTax
    : "";
  data.salesTax = !isEmpty(data.salesTax) ? data.salesTax : "";
  data.totalPrice = !isEmpty(data.totalPrice) ? data.totalPrice : "";
  data.monthlyPrice = !isEmpty(data.monthlyPrice) ? data.monthlyPrice : "";
  data.taxRate = !isEmpty(data.taxRate) ? data.taxRate : "";
  data.deliveryTotal = !isEmpty(data.deliveryTotal) ? data.deliveryTotal : "";

  if (!ObjectID.isValid(data.customer)) {
    errors.customer = "Customer selected does not exist";
  }

  if (!ObjectID.isValid(data.purchaseType)) {
    errors.purchaseType = "Purchase type selected does not exist";
  }

  if (data.products.constructor !== Array) {
    errors.products = "Products were not passed correctly";
  }

  // Return errors and a property called isValid.
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
