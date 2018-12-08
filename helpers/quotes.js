const { ObjectID } = require("mongodb");
const _ = require("lodash");
const jwt_decode = require("jwt-decode");

// models
const Quote = require("../models/Quote");
const PurchaseType = require("../models/PurchaseType");
const PurchasePrices = require("../models/PurchasePrices");
const RequestedProduct = require("../models/RequestedProduct");

// validation files
const validateQuoteInput = require("../validation/quote");

// @route   GET api/quotes/
// @desc    Retrieves all of the quotes
// @access  Private
exports.getQuotes = (req, res) => {
  let errors = {};

  Quote.find({ isHidden: false })
    .populate("customer")
    .populate("purchaseType")
    .populate("purchasePrices")
    .populate("createdBy")
    .populate("products.product")
    .then(quotes => {
      if (!quotes) {
        errors.quotes = "There were no quotes found for this user";
        return res.status(400).json(errors);
      }

      res.json(quotes);
    })
    .catch(e => res.status(404).json(e));
};

// @route   GET api/quotes/user/:id
// @desc    Retrieves all of the quotes created by a user
// @access  Private
exports.getUserQuotes = (req, res) => {
  let errors = {};

  // Check to see if error is a valid ObjectID
  if (!ObjectID.isValid(req.params.id)) {
    errors.quote = "There were no quotes found for this user";
    return res.status(400).json(errors);
  }

  Quote.find({ createdBy: req.params.id, isHidden: false })
    .populate("customer")
    .populate("purchaseType")
    .populate("purchasePrices")
    .populate("createdBy")
    .populate("products.product")
    .then(quotes => {
      if (!quotes) {
        errors.quotes = "There were no quotes found for this user";
        return res.status(400).json(errors);
      }

      res.json(quotes);
    })
    .catch(e => res.status(404).json(e));
};

// @route   GET api/quotes/customer/:id
// @desc    Retrieves all of the quotes for a customer
// @access  Private
exports.getCustomerQuotes = (req, res) => {
  let errors = {};

  // Check to see if error is a valid ObjectID
  if (!ObjectID.isValid(req.params.id)) {
    errors.quote = "There were no quotes found for this customer";
    return res.status(400).json(errors);
  }

  Quote.find({ customer: req.params.id, isHidden: false })
    .populate("customer")
    .populate("purchaseType")
    .populate("purchasePrices")
    .populate("createdBy")
    .populate("products.product")
    .then(quotes => {
      if (!quotes) {
        errors.quotes = "There were no quotes found for this customer";
        return res.status(400).json(errors);
      }

      res.json(quotes);
    })
    .catch(e => res.status(404).json(e));
};

// @route   POST api/quotes/
// @desc    Creates a new quote.
// @access  Private
// @expects body to contain:
//  				customer: ObjectID
// 					purchaseType: ObjectID
// 					attention: String
// 					products: Array consisting of objects, example:
// 										[ {quantity: int, product: (object)},
// 											{quantity: int, product: (object)} ]
// 					priceBeforeTax: Double
// 					salesTax: Double
// 					totalPrice: Double
// 					monthlyPrice: Double
// 					taxRate: Double
// 					deliveryTotal: Double
exports.postQuote = (req, res) => {
  // Fetch validation errors.
  const { errors, isValid } = validateQuoteInput(req.body);
  // send 400 error with validation errors if not valid.
  if (!isValid) return res.status(400).json(errors);

  Customer.findById(req.body.customer).then(customer => {
    if (!customer) {
      errors.customer = "Customer selected does not exist";
      return res.status(400).json(errors);
    }

    PurchaseType.findById(req.body.purchaseType).then(purchaseType => {
      if (!purchaseType) {
        errors.purchaseType = "Purchase type selected does not exist";
        return res.status(400).json(errors);
      }

      var body = _.pick(req.body, ["customer", "purchaseType", "attention"]);
      body.creationDate = new Date();
      // Create expiration date
      body.expirationDate = new Date();
      body.expirationDate.setMonth(body.expirationDate.getMonth() + 1);
      body.status = "Open";
      body.isHidden = false;

      // Get the users information
      var user = jwt_decode(req.token);
      // Set the createdBy property for the quote.
      body.createdBy = user._id;

      // create an empty array of products in the body to fill later
      body.products = [];

      // Create the purchase prices
      var bodyPrices = _.pick(req.body, [
        "priceBeforeTax",
        "salesTax",
        "totalPrice",
        "monthlyPrice",
        "taxRate",
        "deliveryTotal"
      ]);

      // Create the quote's prices object
      var newPurchasePrices = new PurchasePrices(bodyPrices);

      // Save the newly created purchase prices object
      newPurchasePrices
        .save()
        .then(purchasePrices => {
          if (!purchasePrices) {
            errors.quote = "There was an issue creating the quote";
            return res.status(400).json(errors);
          }

          // Add the ID to the body variable.
          body.purchasePrices = purchasePrices._id;

          // initialize an empty array to store formatted RequestedProduct objects
          var tempReqProducts = [];

          // Add products to temp requested products array
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

              // Create the quote
              var newQuote = new Quote(body);

              newQuote
                .save()
                .then(quote => {
                  if (!quote) {
                    errors.quote = "There was an issue creating the quote";
                    return res.status(400).json(errors);
                  }

                  // Update requested products with the new quote's ID
                  quote.products.forEach(product => {
                    RequestedProduct.findByIdAndUpdate(product.product, {
                      $set: { quote: quote._id }
                    }).catch(e => console.log(e));
                  });

                  // Send the new quote forward.
                  res.json(quote);
                })
                .catch(e => res.status(404).json(e));
            })
            .catch(e => res.status(404).json(e));
        })
        .catch(e => res.status(404).json(e));
    });
  });
};

// @route   GET api/quotes/:id
// @desc    Retrieves a single quote.
// @access  Private
exports.getQuote = (req, res) => {
  let errors = {};

  // Check to see if error is a valid ObjectID
  if (!ObjectID.isValid(req.params.id)) {
    errors.quote = "There was no quote found";
    return res.status(400).json(errors);
  }

  Quote.findById(req.params.id)
    .populate("customer")
    .populate("purchaseType")
    .populate("purchasePrices")
    .populate("createdBy")
    .populate("products.product")
    .then(quote => {
      if (!quote) {
        errors.quote = "There was no quote found";
        return res.status(400).json(errors);
      }

      res.json(quote);
    })
    .catch(e => res.status(404).json(e));
};

// @route   PATCH api/quotes/:id
// @desc    Updates all or part of a single quote.
// @access  Private
// @expects body to contain:
//          _id: ObjectID
//  				customer: ObjectID
// 					purchaseType: ObjectID
//          purchasePrices: ObjectID
//          createdBy: ObjectID
//          isHidden: Boolean
//          status: String (Open or Closed)
// 					attention: String
// 					creationDate: String (Date)
// 					expirationDate: String (Date)
// 					products: Array consisting of objects, example:
// 										[ {quantity: int, product: (object)},
// 											{quantity: int, product: (object)} ]
// 					priceBeforeTax: Double
// 					salesTax: Double
// 					totalPrice: Double
// 					monthlyPrice: Double
// 					taxRate: Double
// 					deliveryTotal: Double
exports.patchQuote = (req, res) => {
  // Fetch validation errors.
  const { errors, isValid } = validateQuoteInput(req.body);

  // send 400 error with validation errors if not valid.
  if (!isValid || !ObjectID.isValid(req.params.id)) {
    if (!ObjectID.isValid(req.params.id)) {
      errors.quote = "No quote found";
    }
    return res.status(400).json(errors);
  }

  Customer.findById(req.body.customer).then(customer => {
    if (!customer) {
      errors.customer = "Customer selected does not exist";
      return res.status(400).json(errors);
    }

    PurchaseType.findById(req.body.purchaseType).then(purchaseType => {
      if (!purchaseType) {
        errors.purchaseType = "Purchase type selected does not exist";
        return res.status(400).json(errors);
      }

      var body = _.pick(req.body, [
        "_id",
        "customer",
        "purchaseType",
        "attention",
        "creationDate",
        "expirationDate",
        "status",
        "isHidden",
        "createdBy",
        "purchasePrices"
      ]);

      // create an empty array of products in the body to fill later
      body.products = [];

      // Create the purchase prices
      var bodyPrices = _.pick(req.body, [
        "priceBeforeTax",
        "salesTax",
        "totalPrice",
        "monthlyPrice",
        "taxRate",
        "deliveryTotal"
      ]);

      // Update the quote's purchase prices
      if (!ObjectID.isValid(body.purchasePrices)) {
        errors.purchasePrices =
          "There is an issue with the quote's purchase prices";
        return res.status(400).json(errors);
      }

      PurchasePrices.findByIdAndUpdate(
        body.purchasePrices,
        { $set: bodyPrices },
        { new: true }
      ).then(purchasePrices => {
        if (!purchasePrices) {
          errors.quote = "There was an issue updating the quote";
          return res.status(400).json(errors);
        }

        // initialize an empty array to store formatted RequestedProduct objects
        var tempReqProducts = [];

        // Add products to temp requested products array
        req.body.products.forEach(request => {
          tempReqProducts.push({
            order: null,
            quote: null,
            productQuantity: request.quantity,
            product: request.product
          });
        });

        // Add products to requested products collection
        RequestedProduct.remove({ quote: body._id })
          .then(() => {
            RequestedProduct.insertMany(tempReqProducts)
              .then(products => {
                // Add the products to body.products array
                products.forEach(product => {
                  body.products.push({
                    quantity: product.productQuantity,
                    product: product._id
                  });
                });

                // Update the quote
                Quote.findByIdAndUpdate(body._id, { $set: body }, { new: true })
                  .then(quote => {
                    if (!quote) {
                      errors.quote = "There was an issue creating the quote";
                      return res.status(400).json(errors);
                    }
                    // Update requested products with the new quote's ID
                    quote.products.forEach(product => {
                      RequestedProduct.findByIdAndUpdate(product.product, {
                        $set: { quote: quote._id }
                      }).catch(e => console.log(e));
                    });

                    // Send the new quote forward.
                    res.json(quote);
                  })
                  .catch(e => res.status(404).json(e));
              })
              .catch(e => res.status(404).json(e));
          })
          .catch(e => res.status(404).json(e));
      });
    });
  });
};

// @route   DELETE api/quotes/:id
// @desc    Deletes a single quote from the database.
// @access  Private
exports.deleteQuote = (req, res) => {
  let errors = {};

  // Check to see if error is a valid ObjectID
  if (!ObjectID.isValid(req.params.id)) {
    errors.quote = "There was no quote found";
    return res.status(400).json(errors);
  }

  Quote.findByIdAndRemove(req.params.id)
    .populate("customer")
    .populate("purchaseType")
    .populate("purchasePrices")
    .populate("createdBy")
    .populate("products.product")
    .then(quote => {
      if (!quote) {
        errors.quote = "There was no quote found";
        return res.status(400).json(errors);
      }

      res.json(quote);
    })
    .catch(e => res.status(404).json(e));
};
