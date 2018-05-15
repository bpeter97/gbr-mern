const { ObjectID } = require("mongodb");
const _ = require("lodash");

// models
const PurchaseType = require("../models/PurchaseType");

// validation files
const validateSettingInput = require("../validation/setting");

// @route   GET api/settings/purchasetypes
// @desc    Retrieves all of the purchase types
// @access  Private
exports.getPurchaseTypes = (req, res) => {
  PurchaseType.find({})
    .then(purchaseTypes => {
      if (!purchaseTypes) {
        return res.send("No purchase types found");
      }
      res.json({ purchaseTypes });
    })
    .catch(e => res.status(404).json(e));
};

// @route   POST api/settings/purchasetypes
// @desc    Creates a new purchase type
// @access  Private
exports.postPurchaseType = (req, res) => {
  // Fetch validation errors.
  const { errors, isValid } = validateSettingInput("purchaseType", req.body);

  // send 400 error with validation errors if not valid.
  if (!isValid) return res.status(400).json(errors);

  // create it.
  var newType = new PurchaseType({ type: req.body.type });

  // Save it in the DB and return it.
  newType
    .save()
    .then(purchaseType => {
      res.json({ purchaseType });
    })
    .catch(e => console.log(e));
};

// @route   GET api/settings/purchasetypes/:id
// @desc    Retrieves a purchase type
// @access  Private
exports.getPurchaseType = (req, res) => {
  errors = {};

  // Check to see if error is a valid ObjectID
  if (!ObjectID.isValid(req.params.id)) {
    errors.purchaseType = "There was no purchase type found";
    return res.status(400).json(errors);
  }

  // Find the object in the DB!
  PurchaseType.findById(req.params.id)
    .then(purchaseType => {
      if (!purchaseType) {
        errors.purchaseType = "There was no purchase type found";
        return res.status(400).json(errors);
      }

      res.json({ purchaseType });
    })
    .catch(e => console.log(e));
};

// @route   PATCH api/settings/purchasetypes/:id
// @desc    Updates a purchase type
// @access  Private
exports.patchPurchaseType = (req, res) => {
  // Fetch validation errors.
  const { errors, isValid } = validateSettingInput("purchaseType", req.body);

  // send 400 error with validation errors if not valid.
  if (!isValid || !ObjectID.isValid(req.params.id)) {
    if (!ObjectID.isValid(req.params.id)) {
      errors.purchaseType = "No purchase type found";
    }
    return res.status(400).json(errors);
  }

  // find that document and update the type field.
  PurchaseType.findByIdAndUpdate(
    req.params.id,
    { $set: { type: req.body.type } },
    { new: true }
  )
    .then(purchaseType => {
      if (!purchaseType) {
        errors.purchaseType = "Unable to find and update the purchaseType";
        return res.status(404).json(errors);
      }
      // Return the newly modified purchaseType.
      res.json({ purchaseType });
    })
    .catch(e => res.status(400).send());
};

// @route   DELETE api/settings/purchasetypes/:id
// @desc    Deletes a purchase type
// @access  Private
exports.deletePurchaseType = (req, res) => {
  let errors = {};

  // send 400 error with validation errors if not valid.
  if (!ObjectID.isValid(req.params.id)) {
    errors.purchaseType = "No purchase type found";
    return res.status(400).json(errors);
  }

  // find and delete the purchase type
  PurchaseType.findByIdAndRemove(req.params.id)
    .then(purchaseType => {
      if (!purchaseType) {
        errors.purchaseType = "Unable to find and remove the purchase type";
        res.status(404).json(errors);
      }
      // Return the product that was just removed.
      res.json({ purchaseType });
    })
    .catch(e => console.log(e));
};
