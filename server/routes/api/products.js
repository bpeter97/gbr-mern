const express = require("express");
const router = express.Router();

const helpers = require("../../helpers/products");

// @route   GET api/products/
// @desc    Retrieves all of the products
// @access  Private
router.route("/products").get(helpers.getProducts);

// @route   POST api/products/
// @desc    Creates a new product.
// @access  Private

// @route   GET api/products/types
// @desc    Retrieves all of the product types
// @access  Private
router.route("/products/types").get(helpers.getProductTypes);

// @route   POST api/products/types
// @desc    Creates a new product type
// @access  Private
router.route("/products/types").post(helpers.postProductType);

// @route   GET api/products/types/:id
// @desc    Retrieves a specific product type
// @access  Private

// @route   PATCH api/products/types/:id
// @desc    Updates a specific product type
// @access  Private

// @route   DELETE api/products/types/:id
// @desc    Deletes a specific product type
// @access  Private

// @route   GET api/products/:id
// @desc    Retrieves a single product.
// @access  Private

// @route   PATCH api/products/:id
// @desc    Updates all or part of a single product.
// @access  Private

// @route   DELETE api/products/:id
// @desc    Deletes a single product from the database.
// @access  Private
