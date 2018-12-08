const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NotificationSchema = new Schema({
  notification: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  itemId: {
    type: Schema.Types.ObjectId,
    refPath: "type",
    required: true
  },
  dateTime: {
    type: Date,
    required: true
  }
});

module.exports = Notification = mongoose.model(
  "Notification",
  NotificationSchema
);
