const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PurchaseTypeSchema = new Schema({
  type: {
    type: String,
    required: true
  }
});
module.exports = PurchaseType = mongoose.model("PurchaseType", PurchaseTypeSchema);