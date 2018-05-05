const express = require("express");
const router = express.Router();

const helpers = require("../../helpers/products");

// @route   api/products/
// @GET     Retrieve all of the products
// @POST    Create a new product
// @access  Private
router
  .route("/")
  .get(helpers.getProducts)
  .post(helpers.postProduct);

// @route   api/products/types
// @GET     Retrieves all of the product types
// @POST    Create a new product type
// @access  Private
router
  .route("/types")
  .get(helpers.getProductTypes)
  .post(helpers.postProductType);

// @route   api/products/types/:id
// @GET     Retrieves all of the product types
// @PATCH   Updates a product type
// @DELETE  Deletes a product type
// @access  Private
router
  .route("/types/:id")
  .get(helpers.getProductType)
  .patch(helpers.patchProductType)
  .delete(helpers.deleteProductType);

// @route   GET api/products/:id
// @GET     api/products/:id
// @PATCH   api/products/:id
// @DELTE   api/products/:id
// @access  Private

module.exports = router;
