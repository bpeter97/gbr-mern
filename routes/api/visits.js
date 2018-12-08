const express = require("express");
const router = express.Router();

const helpers = require("../../helpers/visits");

// @route   api/visits/
// @GET     Retrieves all of the user's visits.
// @POST    Creates a new RecentVisit.
// @access  Private
router
  .route("/")
  .get(helpers.getVisits)
  .post(helpers.postVisit);

// @route   api/visit/:id
// @DELETE  Deletes a visit.
// @access  Private
router.route("/:id").delete(helpers.deleteVisit);

module.exports = router;
