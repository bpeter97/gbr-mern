const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ContainerDeliverySchema = new Schema({
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
});

module.exports = ContainerDelivery = mongoose.model(
  "ContainerDelivery",
  ContainerDeliverySchema
);
