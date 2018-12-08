const express = require("express");
const router = express.Router();

const helpers = require("./../../helpers/customers");

// @route   api/customers/
// @GET     Retrieves all of the customers
// @POST    Creates a new customer
// @access  Private
router
  .route("/")
  .get(helpers.getCustomers)
  .post(helpers.postCustomer);

// @route   api/customers/:id
// @GET     Retrieves a single customer.
// @PATCH   Updates all or part of a single customer.
// @DELETE  Deletes a single customer from the database.
// @access  Private
router
  .route("/:id")
  .get(helpers.getCustomer)
  .patch(helpers.patchCustomer)
  .delete(helpers.deleteCustomer);

module.exports = router;
