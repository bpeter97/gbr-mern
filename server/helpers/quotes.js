const { ObjectID } = require("mongodb");
const _ = require("lodash");

// models
const Quote = require("../models/Quote");
const PurchasePrices = require("../models/PurchasePrices");
const RequestedProduct = require("../models/RequestedProduct");

// validation files
// const validateQuoteInput = require("../validation/quote");

// @route   GET api/quotes/
// @desc    Retrieves all of the quotes
// @access  Private
exports.getQuotes = (req, res) => {
	let errors = {};

	Quote.find({})
		.then(quotes => {
			if (!quotes) {
				errors.quotes = "There were no quotes found for this user";
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
	// // Fetch validation errors.
	// const { errors, isValid } = validateQuoteInput(req.body);
	// // send 400 error with validation errors if not valid.
	// if (!isValid) return res.status(400).json(errors);

	var body = _.pick(req.body, [
		"customer",
		"purchaseType",
		"attention",
		"products" // array consisting of: [ {quantity (int), product (obj)} ]);
	]); // Create the creation date
	body.creationDate = new Date().getDate();
	// Create expiration date
	body.expirationDate = new Date();
	body.expirationDate.setMonth(body.expirationDate.getMonth() + 1);
	body.status = "Open";
	body.isHidden = false;

	// Get the users information
	var user = jwt_decode(req.token);
	// Set the createdBy property for the quote.
	body.createdBy = user._id;

	// Create the purchase prices
	var bodyPrices = _.pick(req.body, [
		"priceBeforeTax",
		"salesTax",
		"totalPrice",
		"monthlyPrice",
		"taxRate",
		"deliveryTotal"
	]);

	var newPurchasePrices = new PurchasePrices(bodyPrices);

	newPurchasePrices
		.save()
		.then(purchasePrices => {
			if (!purchasePrices) {
				errors.quote = "There was an issue creating the quote";
				return res.status(400).json(errors);
			}

			// Create the quote
			body.purchasePrices = purchasePrices._id;

			var newQuote = new Quote(body);
			newQuote
				.save()
				.then(quote => {
					if (!quote) {
						errors.quote = "There was an issue creating the quote";
						return res.status(400).json(errors);
					}

					// Add products to requested products collection
					body.products.map(item => {
						var newProduct = new RequestedProduct({
							order: null,
							quote: quote._id,
							productQuantity: item.quantity,
							product: item.product
						});
						newProduct.save().catch(e => res.status(404).json(e));
					});

					// Everything is successful, return the quote.
					res.json(quote);
				})
				.catch(e => res.status(404).json(e));
		})
		.catch(e => res.status(404).json(e));
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
exports.patchQuote = (req, res) => {};

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
		.then(quote => {
			if (!quote) {
				errors.quote = "There was no quote found";
				return res.status(400).json(errors);
			}

			res.json(quote);
		})
		.catch(e => res.status(404).json(e));
};
