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
  deliveries: [
    {
      delivery: {
        type: Schema.Types.ObjectId,
        ref: "ContainerDelivery"
      },
      dateDeliveryCreated: {
        type: Date
      }
    }
  ],
  stats: {
    type: Schema.Types.ObjectId,
    ref: "ContainerStats",
    required: true
  }
});

ContainerSchema.post("init", function(doc) {
  if (doc.deliveries.length > 0) {
    doc.deliveries
      .sort(function(a, b) {
        return a.dateDeliveryCreated > b.dateDeliveryCreated
          ? 1
          : b.dateDeliveryCreated > a.dateDeliveryCreated
          ? -1
          : 0;
      })
      .reverse();
  }
});

module.exports = Container = mongoose.model("Container", ContainerSchema);
