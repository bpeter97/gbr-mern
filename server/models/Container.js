const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ContainerSchema = new Schema({
  gbrNumber: {
    type: String
  },
  releaseNumber: {
    type: String
  },
  size: {
    type: Schema.Types.ObjectId,
    ref: "ContainerSize",
    required: true
  },
  serialNumber: {
    type: String
  },
  hasShelves: {
    type: Boolean,
    default: false
  },
  isPainted: {
    type: Boolean,
    default: false
  },
  hasOnBoxNumbers: {
    type: Boolean,
    default: false
  },
  hasSigns: {
    type: Boolean,
    default: false
  },
  rentalResale: {
    type: String,
    required: true
  },
  isFlagged: {
    type: Boolean,
    default: false
  },
  flagReason: {
    type: String
  },
  delivery: {
    driver: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    notes: {
      type: String
    },
    isDelivered: {
      type: Boolean,
      default: false,
      required: true
    },
    dateDelivered: {
      type: Date
    },
    isPickedUp: {
      type: Boolean,
      default: false,
      required: true
    },
    pickupDate: {
      type: Date
    }
  },
  stats: {
    type: Schema.Types.ObjectId,
    ref: "ContainerStats",
    required: true
  }
});

module.exports = Container = mongoose.model("Container", ContainerSchema);
