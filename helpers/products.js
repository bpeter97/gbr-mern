const { ObjectID } = require("mongodb");
const _ = require("lodash");

// models
const Product = require("../models/Product");
const ProductType = require("../models/ProductType");

// validation files
const validateProductInput = require("../validation/product");

// @route   GET api/products
// @desc    Retrieve all products.
// @access  Private
exports.getProducts = (req, res) => {
  Product.find({})
    .populate("type")
    .then(products => {
      if (!products) {
        return res.send("No products found.");
      }
      res.json(products);
    })
    .catch(e => res.status(404).json(e));
};

// @route   POST api/products/
// @desc    Creates a new product.
// @access  Private
exports.postProduct = (req, res) => {
  // Fetch validation errors.
  const { errors, isValid } = validateProductInput("product", req.body);

  // send 400 error with validation errors if not valid.
  if (!isValid) return res.status(400).json(errors);

  // easily grab posted data
  var body = _.pick(req.body, [
    "name",
    "shortName",
    "price",
    "monthlyPrice",
    "rental"
  ]);
  body.type = new ObjectID(req.body.type);

  // check to see if the product type already exists.
  ProductType.findOne({ name: body.name }).then(product => {
    if (product) {
      errors.name = "This product already exists";
      return res.status(400).json(errors);
    }

    // If product does not exist, create it.
    var newProduct = new Product(body);

    // Save it in the DB and return it.
    newProduct
      .save()
      .then(product => {
        res.json(product);
      })
      .catch(e => console.log(e));
  });
};

// @route   GET api/products/types
// @desc    Retrieves all of the product types
// @access  Private
exports.getProductTypes = (req, res) => {
  ProductType.find({})
    .then(productTypes => {
      if (!productTypes) {
        return res.send("No product types found.");
      }

      res.json(productTypes);
    })
    .catch(e => res.status(404).json(e));
};

// @route   POST api/products/types
// @desc    Creates a new product type
// @access  Private
exports.postProductType = (req, res) => {
  // Fetch validation errors.
  const { errors, isValid } = validateProductInput("productType", req.body);

  // send 400 error with validation errors if not valid.
  if (!isValid) return res.status(400).json(errors);

  // check to see if the product type already exists.
  ProductType.findOne({ type: req.body.type }).then(productType => {
    if (productType) {
      errors.type = "This product type already exists";
      return res.status(400).json(errors);
    }

    // If product type does not exist, create it.
    var newProductType = new ProductType({
      type: req.body.type
    });

    // Save it in the DB and return it.
    newProductType
      .save()
      .then(productType => {
        res.json(productType);
      })
      .catch(e => console.log(e));
  });
};

// @route   GET api/products/types/:id
// @desc    Retrieves a specific product type
// @access  Private
exports.getProductType = (req, res) => {
  errors = {};

  // Check to see if error is a valid ObjectID
  if (!ObjectID.isValid(req.params.id)) {
    errors.type = "There was no product type found";
    return res.status(400).json(errors);
  }

  // Find the object in the DB!
  ProductType.findById(req.params.id)
    .then(type => {
      if (!type) {
        errors.type = "There was no product type found";
        return res.status(400).json(errors);
      }

      res.json(type);
    })
    .catch(e => console.log(e));
};

// @route   PATCH api/products/types/:id
// @desc    Updates a specific product type
// @access  Private
exports.patchProductType = (req, res) => {
  // Fetch validation errors.
  const { errors, isValid } = validateProductInput("productType", req.body);

  // send 400 error with validation errors if not valid.
  if (!isValid || !ObjectID.isValid(req.params.id)) {
    if (!ObjectID.isValid(req.params.id)) {
      errors.type = "No product found with that ID in the URL";
    }
    return res.status(400).json(errors);
  }

  // assign the type
  var type = req.body.type;

  // Check to see if new product type already exists
  ProductType.findOne({ type }).then(newType => {
    // If so, return error!
    if (newType) {
      errors.type = "That type is already being used";
      res.status(400).json(errors);
    }

    // find that document and update the type field.
    ProductType.findByIdAndUpdate(
      req.params.id,
      { $set: { type: type } },
      { new: true }
    )
      .then(type => {
        if (!type) {
          errors.type = "Unable to find and update the type";
          return res.status(404).json(errors);
        }
        // Return the newly modified type.
        res.json(type);
      })
      .catch(e => res.status(400).send());
  });
};

// @route   DELETE api/products/types/:id
// @desc    Deletes a specific product type
// @access  Private
exports.deleteProductType = (req, res) => {
  errors = {};

  // Check to see if error is a valid ObjectID
  if (!ObjectID.isValid(req.params.id)) {
    errors.type = "There was no product type found";
    return res.status(400).json(errors);
  }

  // Find the type by ID and remove it.
  ProductType.findByIdAndRemove(req.params.id)
    .then(type => {
      // Type was not found!
      if (!type) {
        errors.type = "Unable to find and remove the product type";
        res.status(404).json(errors);
      }
      // Return the type that was just removed.
      res.json(type);
    })
    .catch(e => res.status(400).send());
};

// @route   GET api/products/:id
// @desc    Retrieves a single product.
// @access  Private
exports.getProduct = (req, res) => {
  errors = {};

  // Check to see if error is a valid ObjectID
  if (!ObjectID.isValid(req.params.id)) {
    errors.product = "There was no product found";
    return res.status(400).json(errors);
  }

  // Find the object in the DB!
  Product.findById(req.params.id)
    .populate("type")
    .then(product => {
      if (!product) {
        errors.product = "There was no product found";
        return res.status(400).json(errors);
      }

      res.json(product);
    })
    .catch(e => console.log(e));
};

// @route   PATCH api/products/:id
// @desc    Updates all or part of a single product.
// @access  Private
exports.patchProduct = (req, res) => {
  // Fetch validation errors.
  const { errors, isValid } = validateProductInput("product", req.body);

  // send 400 error with validation errors if not valid.
  if (!isValid || !ObjectID.isValid(req.params.id)) {
    if (!ObjectID.isValid(req.params.id)) {
      errors.product = "No product found.";
    }
    return res.status(400).json(errors);
  }

  // assign the product
  var body = _.pick(req.body, [
    "name",
    "shortName",
    "price",
    "monthlyPrice",
    "rental"
  ]);
  body.type = new ObjectID(req.body.type._id);

  // find that document and update it.
  Product.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        name: body.name,
        shortName: body.shortName,
        price: body.price,
        monthlyPrice: body.monthlyPrice,
        rental: body.rental,
        type: body.type
      }
    },
    { new: true }
  )
    .then(product => {
      if (!product) {
        errors.product = "Unable to find and update the product";
        return res.status(404).json(errors);
      }
      // Return the newly modified product.
      res.json(product);
    })
    .catch(e => res.status(400).send());
};

// @route   DELETE api/products/:id
// @desc    Deletes a single product from the database.
// @access  Private
exports.deleteProduct = (req, res) => {
  errors = {};

  // Check to see if error is a valid ObjectID
  if (!ObjectID.isValid(req.params.id)) {
    errors.product = "There was no product found";
    return res.status(400).json(errors);
  }

  // Find the product by ID and remove it.
  Product.findByIdAndRemove(req.params.id)
    .then(product => {
      // product was not found!
      if (!product) {
        errors.product = "Unable to find and remove the product";
        res.status(404).json(errors);
      }
      // Return the product that was just removed.
      res.json(product);
    })
    .catch(e => res.status(400).send());
};
