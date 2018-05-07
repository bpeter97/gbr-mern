const { ObjectID } = require("mongodb");
const _ = require("lodash");
const isEmpty = require("./../validation/is-empty");

// models
const Container = require("../models/Container");
const ContainerSize = require("../models/ContainerSize");
const ContainerStats = require("../models/ContainerStats");

// validation files
const validateContainerInput = require("../validation/container");

// @route   GET api/containers/
// @desc    Retrieves all of the containers
// @access  Private
exports.getContainers = (req, res) => {
  Container.find({})
    .populate("size")
    .populate("stats")
    .then(containers => {
      if (!containers) {
        return res.status(400).json({ error: "No containers found" });
      }
      res.json({ containers });
    })
    .catch(e => res.status(404).json(e));
};

// @route   POST api/containers/
// @desc    Creates a new container.
// @access  Private
exports.postContainer = (req, res) => {
  // check for validation errors
  const { errors, isValid } = validateContainerInput("container", req.body);

  // send 400 error with validation errors if not valid.
  if (!isValid) return res.status(400).json(errors);

  // Set the properties for the new container
  var body = _.pick(req.body, [
    "gbrNumber",
    "releaseNumber",
    "serialNumber",
    "hasShelves",
    "isPainted",
    "hasOnBoxNumbers",
    "hasSigns",
    "rentalResale",
    "isFlagged",
    "flagReason"
  ]);
  body.size = new ObjectID(req.body.size);

  // first, create stats for container
  newConStats = new ContainerStats({
    currentlyRented: false,
    currentRentee: null,
    previousRentees: []
  });

  // save the stats to the DB to aquire ID
  newConStats.save().then(conStats => {
    if (!conStats) {
      errors.containers = "Unable to create container stats";
      return res.status(400).json(errors);
    }

    // attach the stats id to the container
    body.stats = conStats._id;

    // save the container
    var newCon = new Container(body);

    newCon
      .save()
      .then(container => {
        if (!container) {
          errors.containers = "Unable to create the new container";
          return res.status(400).json(errors);
        }
        res.json({ container });
      })
      .catch(e => console.log(e));
  });
};

// @route   GET api/containers/sizes
// @desc    Retrieves all of the containers size
// @access  Private
exports.getContainerSizes = (req, res) => {
  ContainerSize.find({})
    .then(containerSizes => {
      if (!containerSizes) {
        return res.status(400).json({ error: "No sizes found" });
      }
      res.json({ containerSizes });
    })
    .catch(e => res.status(404).json(e));
};

// @route   POST api/containers/sizes
// @desc    Creates a new container size
// @access  Private
exports.postContainerSize = (req, res) => {
  // check for validation errors
  const { errors, isValid } = validateContainerInput("containerSize", req.body);

  // send 400 error with validation errors if not valid.
  if (!isValid) return res.status(400).json(errors);

  // check to see if container size already exists.
  ContainerSize.findOne({ size: req.body.size }).then(containerSize => {
    // If it does, return errors
    if (containerSize) {
      errors.size = "This container size already exists";
      return res.status(400).json(errors);
    }

    // If it does not, create it.
    var conSize = new ContainerSize({
      size: req.body.size
    });

    conSize
      .save()
      .then(containerSize => {
        res.json({ containerSize });
      })
      .catch(e => console.log(e));
  });
};

// @route   GET api/containers/sizes/:id
// @desc    Retrieves a single container size
// @access  Private
exports.getContainerSize = (req, res) => {
  let errors = {};

  // check to see if the ID passed in is a valid ObjectID
  if (!ObjectID.isValid(req.params.id)) {
    errors.size = "There was no size found";
    return res.status(400).json(errors);
  }

  // find the size and return results
  ContainerSize.findById(req.params.id)
    .then(containerSize => {
      if (!containerSize) {
        errors.size = "There was no size found";
        return res.status(400).json(errors);
      }
      res.json({ containerSize });
    })
    .catch(e => console.log(e));
};

// @route   PATCH api/containers/sizes/:id
// @desc    Updates all or part of a single container size
// @access  Private
exports.patchContainerSize = (req, res) => {
  // check for validation errors
  const { errors, isValid } = validateContainerInput("containerSize", req.body);

  // send 400 error with validation errors if not valid.
  if (!isValid || !ObjectID.isValid(req.params.id)) {
    if (!ObjectID.isValid(req.params.id)) {
      errors.size = "There was no size found";
    }
    return res.status(400).json(errors);
  }

  // Assign the posted size
  var size = req.body.size;

  // Check to see if it already exists in the DB
  ContainerSize.findOne({ size }).then(resultSize => {
    if (resultSize) {
      errors.size = "That size already exists";
      return res.status(400).json(errors);
    }

    // If it doesn't exist, update it and return the results.
    ContainerSize.findByIdAndUpdate(
      req.params.id,
      { $set: { size } },
      { new: true }
    )
      .then(containerSize => {
        if (!containerSize) {
          errors.size = "Unable to find and update the size";
          return res.status(400).json(errors);
        }
        res.json({ containerSize });
      })
      .catch(e => console.log(e));
  });
};

// @route   DELETE api/containers/sizes/:id
// @desc    Deletes a single container from the database size
// @access  Private
exports.deleteContainerSize = (req, res) => {
  let errors = {};

  // Check to see if id is a valid ObjectID
  if (!ObjectID.isValid(req.params.id)) {
    errors.size = "There was no size found";
    return res.status(400).json(errors);
  }

  // Find the size by ID and remove it.
  ContainerSize.findByIdAndRemove(req.params.id)
    .then(containerSize => {
      // size was not found!
      if (!containerSize) {
        errors.size = "Unable to find and remove the size";
        res.status(404).json(errors);
      }
      // Return the size that was just removed.
      res.json({ containerSize });
    })
    .catch(e => res.status(400).send());
};

// @route   GET api/containers/:id
// @desc    Retrieves a single container
// @access  Private
exports.getContainer = (req, res) => {
  let errors = {};

  // Check to see if id is a valid ObjectID
  if (!ObjectID.isValid(req.params.id)) {
    errors.container = "There was no container found";
    return res.status(400).json(errors);
  }

  // Find the container, populate the sub models and return it.
  Container.findById(req.params.id)
    .populate("size")
    .populate("stats")
    .then(container => {
      if (!container) {
        errors.container = "There was no container found";
        return res.status(400).json(errors);
      }
      res.json({ container });
    });
};

// @route   PATCH api/containers/:id
// @desc    Updates all or part of a single container
// @access  Private
exports.patchContainer = (req, res) => {
  const { errors, isValid } = validateContainerInput(
    "updateContainer",
    req.body
  );

  // Check to see if id is a valid ObjectID
  if (!ObjectID.isValid(req.params.id)) {
    errors.container = "There was no container found";
    return res.status(400).json(errors);
  }

  var body = _.pick(req.body, [
    "gbrNumber",
    "releaseNumber",
    "serialNumber",
    "hasShelves",
    "isPainted",
    "hasOnBoxNumbers",
    "hasSigns",
    "rentalResale",
    "isFlagged",
    "flagReason"
  ]);
  body.size = new ObjectID(req.body.size);
  body.stats = new ObjectID(req.body.stats);

  var stats = _.pick(req.body, ["currentAddress", "currentlyRented"]);

  if (!isEmpty(req.body.currentRentee)) {
    stats.currentRentee = new ObjectID(req.body.currentRentee);
  } else {
    stats.currentRentee = null;
  }

  stats.previousRentees = [];

  if (req.body.previousRentees != "" || req.body.previousRentees != null) {
    req.body.previousRentees = req.body.previousRentees.split(",");

    req.body.previousRentees.map(rentee =>
      stats.previousRentees.push(new ObjectID(rentee))
    );
  }

  // find populated container by id
  Container.findById(req.params.id)
    .populate("size")
    .populate("stats")
    .then(container => {
      if (!container) {
        errors.container = "There was no container found";
        return res.status(400).json(errors);
      }

      // remove stats _id to be able to compare objects
      delete container.stats._id;

      // check for equality, if not equal update stats.
      if (!_.isEqual(stats, container.stats)) {
        // update the containerStats
        ContainerStats.findById(body.stats)
          .then(newStats => {
            newStats.currentAddress = stats.currentAddress;
            newStats.currentlyRented = stats.currentlyRented;
            newStats.currentRentee = stats.currentRentee;
            newStats.previousRentees = stats.previousRentees;
            newStats = newStats.getLatLon();

            ContainerStats.findByIdAndUpdate(
              body.stats,
              { $set: newStats },
              { new: true }
            )
              .then(updatedStats => {
                if (!updatedStats) {
                  errors.container = "Unable to update the container's stats";
                  return res.status(400).json(errors);
                }
              })
              .catch(e => console.log(e));
          })
          .catch(e => console.log(e));
      }

      // finally, update the container
      Container.findByIdAndUpdate(req.params.id, { $set: body }, { new: true })
        .then(container => {
          if (!container) {
            errors.container = "Unable to update the container";
            return res.status(400).json(errors);
          }

          Container.findById(container._id)
            .populate("size")
            .populate("stats")
            .then(container => {
              if (!container) {
                errors.container = "Unable to update the container";
                return res.status(400).json(errors);
              }

              res.json({ container });
            })
            .catch(e => console.log(e));
        })
        .catch(e => console.log(e));
    });
};

// @route   DELETE api/containers/:id
// @desc    Deletes a single container from the database
// @access  Private
exports.deleteContainer = (req, res) => {
  let errors = {};

  // Check to see if id is a valid ObjectID
  if (!ObjectID.isValid(req.params.id)) {
    errors.size = "There was no size found";
    return res.status(400).json(errors);
  }

  // Find the container, delete the stats, delete the container.
  Container.findById(req.params.id)
    .then(container => {
      if (!container) {
        errors.container = "There was no container found";
        return res.status(400).json(errors);
      }

      // Delete the container stats first
      ContainerStats.findByIdAndRemove(container.stats._id)
        .then(stats => {
          if (!stats) {
            errors.container = "Unable to delete the containers stats";
            return res.status(400).json(errors);
          }
        })
        .catch(e => console.log(e));

      // delete the container
      Container.remove({ _id: container._id })
        .then(container => {
          if (!container) {
            errors.container = "Unable to delete the container";
            return res.status(400).json(errors);
          }
          // Return the container for confirmation
          return res.json({ container });
        })
        .catch(e => console.log(e));
    })
    .catch(e => console.log(e));

  // Find the size by ID and remove it.
  ContainerSize.findByIdAndRemove(req.params.id)
    .then(size => {
      // size was not found!
      if (!size) {
        errors.size = "Unable to find and remove the size";
        res.status(404).json(errors);
      }
      // Return the size that was just removed.
      res.json({ size });
    })
    .catch(e => res.status(400).send());
};
