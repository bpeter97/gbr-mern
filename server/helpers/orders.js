const { ObjectID } = require("mongodb");
const _ = require("lodash");
const isEmpty = require("./../validation/is-empty");

// model
const Order = require("./../models/Order");

// validation files
const validateOrderInput = require("../validation/order");

// @route   GET api/orders/
// @desc    Retrieves all of the orders
// @access  Private
exports.getOrders = (req, res) => {
	Order.find({ isHidden: true })
		.populate("customer")
		.populate("purchaseType")
		.populate("purchasePrices")
		.populate("products.product")
		.populate("containers.container")
		.populate("containers.containerDelivery")
		.populate("createdBy")
		.then(orders => {
			if (!orders) {
				errors.orders = "There were no orders found";
				return res.status(400).json(errors);
			}

			res.json(orders);
		})
		.catch(e => res.status(404).json(e));
};

// @route   GET api/orders/user/:id
// @desc    Retrieves all of the orders for a specific user
// @access  Private
exports.getUserOrders = (req, res) => {
	let errors = {};

	// Check to see if error is a valid ObjectID
	if (!ObjectID.isValid(req.params.id)) {
		errors.order = "There were no orders found for this user";
		return res.status(400).json(errors);
	}

	Order.find({ createdBy: req.params.id })
		.populate("customer")
		.populate("purchaseType")
		.populate("purchasePrices")
		.populate("products.product")
		.populate("containers.container")
		.populate("containers.containerDelivery")
		.populate("createdBy")
		.then(orders => {
			if (!orders) {
				errors.orders = "There were no orders found for this user";
				return res.status(400).json(errors);
			}

			res.json(orders);
		})
		.catch(e => res.status(404).json(e));
};

// @route   GET api/orders/customer/:id
// @desc    Retrieves all of the orders for a specific customer
// @access  Private
exports.getCustomerOrders = (req, res) => {
	let errors = {};

	// Check to see if error is a valid ObjectID
	if (!ObjectID.isValid(req.params.id)) {
		errors.order = "There were no orders found for this customer";
		return res.status(400).json(errors);
	}

	Order.find({ customer: req.params.id })
		.populate("customer")
		.populate("purchaseType")
		.populate("purchasePrices")
		.populate("products.product")
		.populate("containers.container")
		.populate("containers.containerDelivery")
		.populate("createdBy")
		.then(orders => {
			if (!orders) {
				errors.orders = "There were no orders found for this customer";
				return res.status(400).json(errors);
			}

			res.json(orders);
		})
		.catch(e => res.status(404).json(e));
};

// @route   POST api/orders/
// @desc    Creates a new order.
// @access  Private
// @expects body to contain:
//  				customer: ObjectID
// 					purchaseType: ObjectID
//          startDate: Date
//          endDate: Date
// 					job: Object {
//            name: String
//            address: String
//            city: String
//            zipcode: String (containing integers)
//          }
//          purchasePrices: {
//            priceBeforeTax: Double
// 					  salesTax: Double
// 					  totalPrice: Double
// 					  monthlyPrice: Double
// 					  taxRate: Double
// 					  deliveryTotal: Double
//          }
// 					products: Array consisting of objects, example:
// 										[ {quantity: int, product: (object)},
// 											{quantity: int, product: (object)} ]
// 					containers: Array consisting of objects, example:
// 										[
//                      {
//                        container: ObjectID,
//                        containerDelivery: {
//                          driver: ObjectID,
//                          notes: String,
//                          isDelivered: Boolean,
//                          dateDelivered: Date || null,
//                          isPickedUp: Boolean,
//                          pickupDate: Date || null
//                        }
//                      }
//                    ]
// 					createdBy: ObjectID
exports.postOrder = (req, res) => {};

// @route   GET api/orders/:id
// @desc    Retrieves a single order.
// @access  Private
exports.getOrder = (req, res) => {
	let errors = {};

	// Check to see if error is a valid ObjectID
	if (!ObjectID.isValid(req.params.id)) {
		errors.order = "There was no order found";
		return res.status(400).json(errors);
	}

	Order.findById(req.params.id)
		.populate("customer")
		.populate("purchaseType")
		.populate("purchasePrices")
		.populate("products.product")
		.populate("containers.container")
		.populate("containers.containerDelivery")
		.populate("createdBy")
		.then(order => {
			if (!order) {
				errors.order = "There was no order found";
				return res.status(400).json(errors);
			}

			res.json(order);
		})
		.catch(e => res.status(404).json(e));
};

// @route   PATCH api/orders/:id
// @desc    Updates all or part of a single order.
// @access  Private
exports.patchOrder = (req, res) => {};

// @route   DELETE api/orders/:id
// @desc    Deletes a single order from the database.
// @access  Private
exports.deleteOrder = (req, res) => {
	let errors = {};

	// Check to see if error is a valid ObjectID
	if (!ObjectID.isValid(req.params.id)) {
		errors.order = "There was no order found";
		return res.status(400).json(errors);
	}

	Order.findByIdAndRemove(req.params.id)
		.populate("customer")
		.populate("purchaseType")
		.populate("purchasePrices")
		.populate("products.product")
		.populate("containers.container")
		.populate("containers.containerDelivery")
		.populate("createdBy")
		.then(order => {
			if (!order) {
				errors.order = "There was no order found";
				return res.status(400).json(errors);
			}

			res.json(order);
		})
		.catch(e => res.status(404).json(e));
};
