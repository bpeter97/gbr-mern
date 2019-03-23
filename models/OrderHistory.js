const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderHistorySchema = new Schema({
  orderID: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Order"
  },
  orderHistory: [
    {
      order: {},
      changeDate: {
        type: Date
      }
    }
  ]
});

module.exports = OrderHistory = mongoose.model(
  "OrderHistory",
  OrderHistorySchema
);
