const { ObjectID } = require("mongodb");

// models
const Notification = require("../models/Notification");

// validation files
// const validateNotificationInput = require("../validation/notification");

// @route   GET api/notifications/
// @desc    Retrieves all of the notifications.
// @access  Private
exports.getNotifications = (req, res) => {
  let errors = {};

  Notification.find({})
    .populate("itemId")
    .then(notifications => {
      if (!notifications) {
        errors.notifications = "There were no notifications's found.";
        return res.status(400).json(errors);
      }

      res.json(notifications);
    })
    .catch(e => res.status(404).json(e));
};

// @route   POST api/notifications/
// @desc    Creates a new Notification.
// @access  Private
exports.postNotification = (req, res) => {
  // Fetch validation errors.
  // const { errors, isValid } = validateNotificationInput(req.body);

  // send 400 error with validation errors if not valid.
  // if (!isValid) return res.status(400).json(errors);

  var body = {
    notification: req.body.notification,
    type: req.body.type,
    itemId: new ObjectID(req.body.itemId),
    dateTime: new Date()
  };

  const notification = new Notification(body);

  notification
    .save()
    .then(notification => res.json(notification))
    .catch(e => res.status(404).json(e));
};

// @route   DELETE api/notifications/:id
// @desc    Deletes a notification.
// @access  Private
exports.deleteNotification = (req, res) => {
  let errors = {};

  // Check to see if error is a valid ObjectID
  if (!ObjectID.isValid(req.params.id)) {
    errors.notification = "There was no notification found";
    return res.status(400).json(errors);
  }

  Notification.findOneAndRemove({
    _id: req.params.id
  })
    .then(notification => {
      if (!notification) {
        errors.notification = "Could not find the notification";
        return res.status(401).json(errors);
      }

      res.json(notification);
    })
    .catch(e => {
      errors.notification = "Unable to delete this notification";
      console.log(e);
      res.status(400).json(errors);
    });
};
