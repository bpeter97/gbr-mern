const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ContainerShortNameSchema = new Schema({
  shortName: {
    type: String,
    required: true
  }
});

module.exports = ContainerShortName = mongoose.model("ContainerShortName", ContainerShortNameSchema);
