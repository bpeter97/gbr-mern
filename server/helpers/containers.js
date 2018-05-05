const { ObjectID } = require("mongodb");
const _ = require("lodash");

// models
const Container = require("../models/Container");
const ContainerShortName = require("../models/ContainerShortName");
const ContainerSize = require("../models/ContainerSize");
const ContainerStats = require("../models/ContainerStats");

// validation files
const validateContainerInput = require("../validation/container");

// @route   GET api/containers/
// @desc    Retrieves all of the containers
// @access  Private
exports.getContainers = (req, res) => {
  res.json("GET /containers");
};

// @route   POST api/containers/
// @desc    Creates a new container.
// @access  Private
exports.postContainer = (req, res) => {
  res.json("POST /containers");
};

// @route   GET api/containers/shortnames
// @desc    Retrieves all of the containers shortname
// @access  Private
exports.getContainerShortNames = (req, res) => {
  res.json("GET /containers/shortnames");
};

// @route   POST api/containers/shortnames
// @desc    Creates a new container shortname
// @access  Private
exports.postContainerShortName = (req, res) => {
  res.json("POST /containers/shortnames");
};

// @route   GET api/containers/shortnames/:id
// @desc    Retrieves a single container.
// @access  Private
exports.getContainerShortName = (req, res) => {
  res.json("GET /containers/shortnames/:id");
};

// @route   PATCH api/containers/shortnames/:id
// @desc    Updates all or part of a single container
// @access  Private
exports.patchContainerShortName = (req, res) => {
  res.json("PATCH /containers/shortnames/:id");
};

// @route   DELETE api/containers/shortnames/:id
// @desc    Deletes a single container from the database
// @access  Private
exports.deleteContainerShortName = (req, res) => {
  res.json("DELETE /containers/shortnames/:id");
};

// @route   GET api/containers/sizes
// @desc    Retrieves all of the containers size
// @access  Private
exports.getContainerSizes = (req, res) => {
  res.json("GET /containers/sizes");
};

// @route   POST api/containers/sizes
// @desc    Creates a new container size
// @access  Private
exports.postContainerSize = (req, res) => {
  res.json("POST /containers/sizes");
};

// @route   GET api/containers/sizes/:id
// @desc    Retrieves a single container size
// @access  Private
exports.getContainerSize = (req, res) => {
  res.json("GET containers/sizes/:id");
};

// @route   PATCH api/containers/sizes/:id
// @desc    Updates all or part of a single container size
// @access  Private
exports.patchContainerSize = (req, res) => {
  res.json("PATCH containers/sizes/:id");
};

// @route   DELETE api/containers/sizes/:id
// @desc    Deletes a single container from the database size
// @access  Private
exports.deleteContainerSize = (req, res) => {
  res.json("DELETE containers/sizes/:id");
};

// @route   GET api/containers/:id
// @desc    Retrieves a single container
// @access  Private
exports.getContainer = (req, res) => {
  res.json("GET containers/:id");
};

// @route   PATCH api/containers/:id
// @desc    Updates all or part of a single container
// @access  Private
exports.patchContainer = (req, res) => {
  res.json("PATCH containers/:id");
};

// @route   DELETE api/containers/:id
// @desc    Deletes a single container from the database
// @access  Private
exports.deleteContainer = (req, res) => {
  res.json("DELETE containers/:id");
};
