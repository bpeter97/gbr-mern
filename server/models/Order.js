const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  quote: {
    type: Schema.Types.ObjectId
  },
  customer: {
    type: Schema.Types.ObjectId,
    required: true
  },
  purchaseType: {
    type: Schema.Types.ObjectId,
    required: true
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
    required: true
  },
  isHidden: {
    type: Boolean,
    default: false,
    required: true
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
    type: Schema.Types.ObjectId,
    required: true
  }
});

module.exports = Order = mongoose.model("Order", OrderSchema);