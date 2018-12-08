const { ObjectID } = require("mongodb");
const _ = require("lodash");
const jwt_decode = require("jwt-decode");
const isEmpty = require("./../validation/is-empty");

// model
const Order = require("./../models/Order");
const PurchaseType = require("../models/PurchaseType");
const PurchasePrices = require("../models/PurchasePrices");
const RequestedProduct = require("../models/RequestedProduct");
const Product = require("../models/Product");

// validation files
const validateOrderInput = require("../validation/order");

// @route   GET api/orders/
// @desc    Retrieves all of the orders
// @access  Private
exports.getOrders = (req, res) => {
  Order.find({ isHidden: false })
    .populate("customer")
    .populate("purchaseType")
    .populate("purchasePrices")
    .populate({
      path: "products.product",
      model: Product
    })
    .populate("containers.container")
    .populate({
      path: "containers.container",
      populate: { path: "size", model: ContainerSize }
    })
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
    errors.user = "There was no user found";
    return res.status(400).json(errors);
  }

  Order.find({ createdBy: req.params.id })
    .populate("customer")
    .populate("purchaseType")
    .populate("purchasePrices")
    .populate({
      path: "products.product",
      model: Product
    })
    .populate("containers.container")
    .populate({
      path: "containers.container",
      populate: { path: "size", model: ContainerSize }
    })
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
    errors.customer = "There was no customer found";
    return res.status(400).json(errors);
  }

  let id = new ObjectID(req.params.id);

  Order.find({ customer: id })
    .populate("customer")
    .populate("purchaseType")
    .populate("purchasePrices")
    .populate({
      path: "products.product",
      model: Product
    })
    .populate("containers.container")
    .populate({
      path: "containers.container",
      populate: { path: "size", model: ContainerSize }
    })
    .populate("createdBy")
    .then(orders => {
      if (!orders) {
        errors.orders = "There were no orders found for this customer";
        return res.status(400).json(errors);
      }

      res.json({ orders });
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
// 										[ { container: ObjectID } ]
exports.postOrder = (req, res) => {
  // Fetch validation errors.
  // const { errors, isValid } = validateOrderInput(req.body);

  // send 400 error with validation errors if not valid.
  // if (!isValid) return res.status(400).json(errors);

  // Check to see if selected customer ID exists.
  Customer.findById(req.body.customer).then(customer => {
    if (!customer) {
      errors.customer = "Customer selected does not exist";
      return res.status(400).json(errors);
    }

    // Check to see if the purchase type is valid.
    PurchaseType.findById(req.body.purchaseType).then(purchaseType => {
      if (!purchaseType) {
        errors.purchaseType = "Purchase type selected does not exist";
        return res.status(400).json(errors);
      }

      // Begin to create the order.
      var body = _.pick(req.body, [
        "customer",
        "purchaseType",
        "startDate",
        "endDate"
      ]);

      body.job = _.pick(req.body.job, ["name", "address", "city", "zipcode"]);

      // Set the creation date of the order.
      body.creationDate = new Date();

      // Set the stage of the order to 1.
      body.stage = 1;

      // Set isHidden to false since this order is not completed.
      body.isHidden = false;

      // Get the current user's ID and assign it to body
      var user = jwt_decode(req.token);
      body.createdBy = user._id;

      // Create an empty array of products in the body to fill later
      body.products = [];

      // Create the purchasePrices for this order.
      var bodyPrices = _.pick(req.body, [
        "priceBeforeTax",
        "salesTax",
        "totalPrice",
        "monthlyPrice",
        "taxRate",
        "deliveryTotal"
      ]);

      body.containers = [];

      req.body.containers.forEach(container => {
        body.containers.push({
          container: container.container
        });
      });

      // Create the order's prices object
      var newPurchasePrices = new PurchasePrices(bodyPrices);

      // Save the purchase prices.
      newPurchasePrices
        .save()
        .then(purchasePrices => {
          // Check to see if the purchasePrices saved properly.
          if (!purchasePrices) {
            errors.order = "There was an issue creating the purchase prices";
            return res.status(400).json(errors);
          }

          // If it saved, then add the ID to the body variable.
          body.purchasePrices = purchasePrices._id;

          // initialize empty array to store formatted RequestedProduct objects
          var tempReqProducts = [];

          // Add products to the temp requested products array
          req.body.products.forEach(request => {
            tempReqProducts.push({
              order: null,
              quote: null,
              productQuantity: request.quantity,
              product: request.product
            });
          });

          // Add products to requested products collection
          RequestedProduct.insertMany(tempReqProducts)
            .then(products => {
              // Add the products to body.products array
              products.forEach(product => {
                body.products.push({
                  quantity: product.productQuantity,
                  product: product._id
                });
              });

              // Time to create the order.
              var newOrder = new Order(body);

              newOrder
                .save()
                .then(order => {
                  // Check to see if the order saved properly.
                  if (!order) {
                    errors.order = "There was an issue saving the new order";
                    return res.status(400).json(errors);
                  }

                  // Update the requested products with the new order's ID.
                  order.products.forEach(product => {
                    RequestedProduct.findByIdAndUpdate(product.product, {
                      $set: { order: order._id }
                    }).catch(e => console.log(e));
                  });

                  // Send the new order forward.
                  res.json(order);
                })
                .catch(e => res.status(404).json(e));
            })
            .catch(e => res.status(404).json(e));
        })
        .catch(e => res.status(404).json(e));
    });
  });
};

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
