const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  address1: {
    type: String,
    required: true
  },
  address2: {
    type: String
  },
  city: {
    type: String,
    required: true
  },
  zipcode: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  ext: {
    type: String
  },
  fax: {
    type: String
  },
  email: {
    type: String
  },
  rdp: {
    type: String
  },
  notes: {
    type: String
  },
  isFlagged: {
    type: Boolean,
    default: false,
    required: true
  },
  flagReason: {
    type: String
  },
  lastViewed: {
    type: String
  }
});

module.exports = Customer = mongoose.model("Customer", CustomerSchema);
