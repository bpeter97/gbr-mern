const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const QuoteSchema = new Schema({
  customer: {
    type: Schema.Types.ObjectId,
    required: true
  },
  purchaseType: {
    type: Schema.Types.ObjectId,
    required: true
  },
  creationDate: {
    type: String,
    required: true
  },
  expirationDate: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: "Open"
  },
  attention: {
    type: String
  },
  isHidden: {
    type: Boolean,
    default: false
  },
  purchasePrices: {
    type: Schema.Types.ObjectId,
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
  createdBy: {
    type: Schema.Types.ObjectId,
    required: true
  }
});
module.exports = Quote = mongoose.model("Quote", QuoteSchema);
