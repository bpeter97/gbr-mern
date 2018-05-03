const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ContainerStatsSchema = new Schema(
{
    currentAddress: {
        type: String,
        required: true
    },
    currentlyRented: {
        type: Boolean,
        required: true
    },
    latitude: {
        type: String,
        required: true
    },
    longitude: {
        type: String,
        required: true
    },
    currentRentee: {
    type: Schema.Types.ObjectId
    },
    previousRentees: [
        {
            type: Schema.Types.ObjectId
        }
    ]
});

module.exports = ContainerStats = mongoose.model("ContainerStats", ContainerStatsSchema);