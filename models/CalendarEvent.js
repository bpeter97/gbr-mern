const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CalendarEventSchema = new Schema({
  title: {
    type: String,
    minlength: 3,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  start: {
    type: String
  },
  end: {
    type: String
  },
  order: {
    type: Schema.Types.ObjectId
  }
});

module.exports = CalendarEvent = mongoose.model(
  "CalendarEvent",
  CalendarEventSchema
);
