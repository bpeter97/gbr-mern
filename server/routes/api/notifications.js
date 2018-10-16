const express = require("express");
const router = express.Router();

const helpers = require("../../helpers/notifications");

// @route   api/notifications/
// @GET     Retrieves all of the user's notifications.
// @POST    Creates a new Todo.
// @access  Private
router
  .route("/")
  .get(helpers.getNotifications)
  .post(helpers.postNotification);

// @route   GET api/notification/:id
// @DELETE  Deletes a notification.
// @access  Private
router.route("/:id").delete(helpers.deleteNotification);

module.exports = router;
