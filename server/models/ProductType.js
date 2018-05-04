const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductTypeSchema = new Schema({
  type: {
    type: String,
    required: true
  }
});

module.exports = ProductType = mongoose.model("ProductType", ProductTypeSchema);
