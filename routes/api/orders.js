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

// @route   api/orders/user/:id
// @GET     Retrieves all orders created by a user.
// @access  Private
router.route("/user/:id").get(helpers.getUserOrders);

// @route   api/orders/customer/:id
// @GET     Retrieves all orders by a customer.
// @access  Private
router.route("/customer/:id").get(helpers.getCustomerOrders);

// @route   api/orders/history/:id
// @GET     Retrieves a single order's history.
// @access  Private
router.route("/history/:id").get(helpers.getOrderHistory);

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
