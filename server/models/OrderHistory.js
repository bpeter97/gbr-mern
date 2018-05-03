import { builtinModules } from "module";

const mongoose = require("mongoose");
const Schema = mongoose.schema;

const OrderHistorySchema = new Schema({
  orderID: {
    type: Schema.Types.ObjectId,
    required: true
  },
  orderHistory: [
    {
      order: {
        quote: {
          type: Schema.Types.ObjectId
        },
        customer: {
          type: Schema.Types.ObjectId
        },
        purchaseType: {
          type: Schema.Types.ObjectId
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
            type: Schema.Types.ObjectId
          }
        ],
        containers: [
          {
            container: {
              type: Schema.Types.ObjectId
            },
            containerDelivery: {
              type: Schema.Types.ObjectId
            }
          }
        ],
        createdBy: {
          type: Schema.Types.ObjectId
        }
      },
      changeDate: {
        type: Date,
        required: true
      }
    }
  ]
});

module.exports = OrderHistory = mongoose.model("OrderHistory", OrderHistorySchema);