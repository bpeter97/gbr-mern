const express = require("express");
const router = express.Router();

const helpers = require("./../../helpers/settings");

// @route   api/settings/purchasetypes
// @GET     Retrieves all of the purchase types
// @POST    Creates a new purchase type
// @access  Private
router
  .route("/purchasetypes")
  .get(helpers.getPurchaseTypes)
  .post(helpers.postPurchaseType);

// @route   api/settings/purchasetypes/:id
// @GET     Retrieves a single purchase type
// @PATCH   Updates a purchase type
// @DELETE  Deletes a purchase type
// @access  Private
router
  .route("/purchasetypes/:id")
  .get(helpers.getPurchaseType)
  .patch(helpers.patchPurchaseType)
  .delete(helpers.deletePurchaseType);

module.exports = router;
