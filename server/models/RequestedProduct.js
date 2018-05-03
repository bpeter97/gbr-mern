const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RequestedProductSchema = new Schema({
  order: {
    type: Schema.Types.ObjectId
  },
  quote: {
    type: Schema.Types.ObjectId
  },
  productQuantity: {
    type: Number,
    min: 1,
    required: true
  },
  product: {
    name: {
      type: String,
      minlength: 3
    },
    shortName: {
      type: String
    },
    price: {
      type: Number
    },
    rental: {
      type: Boolean
    },
    type: {
      type: Schema.Types.ObjectId
    }
  }
});
module.exports = RequestedProduct = mongoose.model("RequestedProduct", RequestedProductSchema);