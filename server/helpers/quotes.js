const { ObjectID } = require("mongodb");
const _ = require("lodash");

// models
const Quote = require("../models/Quote");
const PurchasePrices = require("../models/PurchasePrices");

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
exports.postQuote = (req, res) => {
	// // Fetch validation errors.
	// const { errors, isValid } = validateQuoteInput(req.body);
	// // send 400 error with validation errors if not valid.
	// if (!isValid) return res.status(400).json(errors);

	var body = _.pick(req.body, [
		"customer",
		"purchaseType",
		"attention",
		"products",
		"createdBy"
	]);
	// Create the creation date
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
  
  newPurchasePrices = new PurchasePrices(bodyPrices);

  newPurchasePrices.save().then(purchasePrices => {
    
  }).catch(e => console.log(e));
	// then
	// Create the quote
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
