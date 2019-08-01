const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  quote: {
    type: Schema.Types.ObjectId,
    ref: "Quote"
  },
  customer: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Customer"
  },
  purchaseType: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "PurchaseType"
  },
  creationDate: {
    type: Date,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date
  },
  job: {
    name: {
      type: String
    },
    address: {
      type: String
    },
    city: {
      type: String
    },
    zipcode: {
      type: String
    }
  },
  stage: {
    type: Number,
    default: 1,
    required: true
  },
  purchasePrices: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "PurchasePrices"
  },
  isHidden: {
    type: Boolean,
    default: false,
    required: true
  },
  products: [
    {
      quantity: {
        type: Number,
        min: 1,
        required: true
      },
      product: {
        type: Schema.Types.ObjectId,
        ref: "RequestedProduct"
      }
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
  signature: {
    type: Schema.Types.ObjectId,
    ref: "OrderSignature"
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
});

module.exports = Order = mongoose.model("Order", OrderSchema);
