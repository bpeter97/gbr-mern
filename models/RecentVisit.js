const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RecentVisitSchema = new Schema({
  type: {
    type: String,
    required: true
  },
  item: {
    type: String
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

module.exports = RecentVisit = mongoose.model("RecentVisit", RecentVisitSchema);
