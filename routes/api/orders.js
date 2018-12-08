const express = require("express");
const router = express.Router();

const helpers = require("../../helpers/orders");

// @route   api/orders/
// @GET     Retrieves all of the orders.
// @POST    Creates a new order.
// @access  Private
router
  .route("/")
  .get(helpers.getOrders)
  .post(helpers.postOrder);

router.route("/user/:id").get(helpers.getUserOrders);
router.route("/customer/:id").get(helpers.getCustomerOrders);

// @route   api/orders/:id
// @GET     Retrieves a single order.
// @PATCH   Updates all or part of a single order.
// @DELETE  Deletes a single order from the database.
// @access  Private
router
  .route("/:id")
  .get(helpers.getOrder)
  .patch(helpers.patchOrder)
  .delete(helpers.deleteOrder);

module.exports = router;
