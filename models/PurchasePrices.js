const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PurchasePricesSchema = new Schema({
  priceBeforeTax: {
    type: Number,
    required: true
  },
  salesTax: {
    type: Number,
    required: true
  },
  totalPrice: {
    type: Number,
    required: true
  },
  monthlyPrice: {
    type: Number,
    required: true
  },
  taxRate: {
    type: Number,
    required: true
  },
  deliveryTotal: {
    type: Number,
    required: true
  }
});

module.exports = PurchasePrices = mongoose.model("PurchasePrices", PurchasePricesSchema);