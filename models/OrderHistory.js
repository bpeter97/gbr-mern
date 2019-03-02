import { builtinModules } from "module";

const mongoose = require("mongoose");
const Schema = mongoose.schema;

const OrderHistorySchema = new Schema({
  orderID: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Order"
  },
  orderHistory: {
    order: {
      quote: {
        type: Schema.Types.ObjectId,
        ref: "Quote"
      },
      customer: {
        type: Schema.Types.ObjectId,
        ref: "Customer"
      },
      purchaseType: {
        type: Schema.Types.ObjectId,
        ref: "PurchaseType"
      },
      creationDate: {
        type: String
      },
      startDate: {
        type: String
      },
      endDate: {
        type: String
      },
      stage: {
        type: Number
      },
      purchasePrices: {
        type: Schema.Types.Mixed
      },
      isHidden: {
        type: Boolean
      },
      products: [
        {
          type: Schema.Types.ObjectId,
          ref: "Product"
        }
      ],
      containers: [
        {
          container: {
            type: Schema.Types.ObjectId,
            ref: "Container"
          },
          containerDelivery: {
            type: Schema.Types.ObjectId,
            ref: "ContainerDelivery"
          }
        }
      ],
      createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User"
      }
    },
    changeDate: {
      type: Date,
      required: true
    }
  }
});

module.exports = OrderHistory = mongoose.model(
  "OrderHistory",
  OrderHistorySchema
);
