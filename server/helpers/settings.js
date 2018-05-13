const { ObjectID } = require("mongodb");
const bcrypt = require("bcryptjs");
const _ = require("lodash");

// models
const User = require("../models/User");

// validation files
const validateSettingInput = require("../validation/setting");

// @route   GET api/settings/purchasetypes
// @desc    Retrieves all of the purchase types
// @access  Private
exports.getPurchaseTypes = (req, res) => {};

// @route   POST api/settings/purchasetypes
// @desc    Creates a new purchase type
// @access  Private
exports.postPurchaseType = (req, res) => {};

// @route   GET api/settings/purchasetypes/:id
// @desc    Retrieves a purchase type
// @access  Private
exports.getPurchaseType = (req, res) => {};

// @route   PATCH api/settings/purchasetypes/:id
// @desc    Updates a purchase type
// @access  Private
exports.patchPurchaseType = (req, res) => {};

// @route   DELETE api/settings/purchasetypes/:id
// @desc    Deletes a purchase type
// @access  Private
exports.deletePurchaseType = (req, res) => {};
