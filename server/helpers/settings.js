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
        return res.send("No purchase types found.");
      }
      res.json({ purchaseTypes });
    })
    .catch(e => res.status(404).json(e));
};

// @route   POST api/settings/purchasetypes
// @desc    Creates a new purchase type
// @access  Private
exports.postPurchaseType = (req, res) => {};

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
exports.patchPurchaseType = (req, res) => {};

// @route   DELETE api/settings/purchasetypes/:id
// @desc    Deletes a purchase type
// @access  Private
exports.deletePurchaseType = (req, res) => {};
