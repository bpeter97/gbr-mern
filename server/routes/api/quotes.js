const express = require("express");
const router = express.Router();

// helper
const helpers = require("./../../helpers/quotes");

// @route   api/quotes/
// @GET     Retrieves all of the quotes
// @POST    Creates a new quote
// @access  Private
router
	.route("/")
	.get(helpers.getQuotes)
	.post(helpers.postQuote);

// @route   api/quotes/:id
// @GET     Retrieves a single quote
// @PATCH   Updates all or part of a single quote
// @DELETE  Deletes a single quote from the database
// @access  Private
router
	.route("/:id")
	.get(helpers.getQuote)
	.patch(helpers.patchQuote)
	.delete(helpers.deleteQuote);

module.exports = router;
