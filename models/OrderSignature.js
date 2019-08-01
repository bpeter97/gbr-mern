const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSignatureSchema = new Schema({
  order: {
    type: Schema.Types.ObjectId,
    ref: "Order"
  },
  customer: {
    type: Schema.Types.ObjectId,
    ref: "Customer"
  },
  signature: {
    type: Schema.Types.Array
  },
  printedName: {
    type: Schema.Types.String
  },
  title: {
    type: Schema.Types.String
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
});

module.exports = OrderSignature = mongoose.model(
  "OrderSignature",
  OrderSignatureSchema
);
