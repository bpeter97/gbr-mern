const express = require("express");
const router = express.Router();

const helpers = require("../../helpers/containers");

// @route   api/containers/
// @GET     Retrieves all of the containers
// @POST    Creates a new container.
// @access  Private
router
  .route("/")
  .get(helpers.getContainers)
  .post(helpers.postContainer);

// @route   api/containers/sizes
// @GET     Retrieves all of the container size
// @POST    Creates a container size
// @access  Private
router
  .route("/sizes")
  .get(helpers.getContainerSizes)
  .post(helpers.postContainerSize);

// @route   api/containers/sizes/:id
// @GET     Retrieves a container size
// @PATCH   Updates a container size
// @DELETE  Deletes a container size
// @access  Private
router
  .route("/sizes/:id")
  .get(helpers.getContainerSize)
  .patch(helpers.patchContainerSize)
  .delete(helpers.deleteContainerSize);

// @route   api/containers/:id
// @GET     Retrieves a single container.
// @PATCH   Updates all or part of a single container.
// @DELETE  Deletes a single container from the database.
// @access  Private
router
  .route("/:id")
  .get(helpers.getContainer)
  .patch(helpers.patchContainer)
  .delete(helpers.deleteContainer);

module.exports = router;
