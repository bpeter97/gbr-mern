const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ContainerSizeSchema = new Schema({
  size: {
    type: String,
    required: true
  }
});

module.exports = ContainerSize = mongoose.model(
  "ContainerSize",
  ContainerSizeSchema
);
