const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: {
    type: String,
    minlength: 3,
    required: true
  },
  shortName: {
    type: String,
    minlength: 2,
    required: true
  },
  price: {
    type: Number
  },
  monthlyPrice: {
    type: Number
  },
  rental: {
    type: Boolean,
    required: true
  },
  type: {
    type: Schema.Types.ObjectId,
    required: true
  }
});

module.exports = Product = mongoose.model("Product", ProductSchema);