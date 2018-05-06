const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const NodeGeocoder = require("node-geocoder");

const ContainerStatsSchema = new Schema({
  currentAddress: {
    type: String,
    default: "6988 Avenue 304, Visalia, CA 93291",
    required: true
  },
  currentlyRented: {
    type: Boolean,
    required: true
  },
  latitude: {
    type: String,
    default: "36.341990"
  },
  longitude: {
    type: String,
    default: "-119.417796"
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

ContainerStatsSchema.methods = {
  getLatLon: function() {
    var stats = this;

    var options = {
      privoder: "google",
      httpAdapter: "https",
      formatter: "json"
    };

    const geocoder = NodeGeocoder(options);

    geocoder.geocode(stats.currentAddress, (err, res) => {
      if (err) {
        stats.latitude = "";
        stats.longitude = "";
      } else {
        stasts.latitude = res[0].latitude;
        stasts.longitude = res[0].longitude;
      }
    });
  }
};

module.exports = ContainerStats = mongoose.model(
  "ContainerStats",
  ContainerStatsSchema
);
