const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ContainerDelivery = new Schema({
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
  totalPrice: {
    type: Number
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
