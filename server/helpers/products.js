// models
const Product = require("../models/Product");
const ProductType = require("../models/ProductType");

// validation files
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

// @route   GET api/products
// @desc    Registers a new user.
// @access  Private
exports.getProducts = (req, res) => {
  // Fetch validation errors.
  const { errors, isValid } = validateRegisterInput(req.body);

  // send 400 error with validation errors if not valid.
  if (!isValid) return res.status(400).json(errors);

  // Check to see if username exists
  Product.findMany({})
    .then(products => {
      if (products) {
        res.status(200).json(products);
      }
    })
    .catch(e => res.status(400).json(e));
};
