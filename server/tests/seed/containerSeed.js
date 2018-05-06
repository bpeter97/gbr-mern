const { ObjectID } = require("mongodb");
const Container = require("../../models/Container");
const ContainerSize = require("../../models/ContainerSize");
const ContainerStats = require("../../models/ContainerStats");

const conOneID = new ObjectID();
const conTwoID = new ObjectID();
const conThreeID = new ObjectID();

const conOneSizeID = new ObjectID();
const conTwoSizeID = new ObjectID();
const conThreeSizeID = new ObjectID();

const conShortNameOneID = new ObjectID();
const conShortNameTwoID = new ObjectID();
const conShortNameThreeID = new ObjectID();

const conOneStatsID = new ObjectID();
const conTwoStatsID = new ObjectID();
const conThreeStatsID = new ObjectID();

// Create container sizes array
containerSizes = [
  {
    _id: conOneSizeID,
    size: "20"
  },
  {
    _id: conTwoSizeID,
    size: "40"
  },
  {
    _id: conThreeSizeID,
    size: "20DD"
  }
];

// Create container stats array
containerStats = [
  {
    _id: conOneStatsID,
    currentAddress: "6988 Avenue 304, Visalia, CA 93291",
    currentlyRented: false,
    latitude: "",
    longitude: "",
    currentRentee: new ObjectID(),
    previousRentees: [
      {
        _id: new ObjectID()
      },
      {
        _id: new ObjectID()
      },
      {
        _id: new ObjectID()
      },
      {
        _id: new ObjectID()
      }
    ]
  },
  {
    _id: conTwoStatsID,
    currentAddress: "6988 Avenue 304, Visalia, CA 93291",
    currentlyRented: false,
    latitude: "36.341990",
    longitude: "-119.417796",
    currentRentee: new ObjectID(),
    previousRentees: []
  },
  {
    _id: conThreeStatsID,
    currentAddress: "6988 Avenue 304, Visalia, CA 93291",
    currentlyRented: false,
    latitude: "36.341990",
    longitude: "-119.417796",
    currentRentee: new ObjectID(),
    previousRentees: []
  }
];

// Create container array
containers = [
  {
    _id: conOneID,
    gbrNumber: "99-0001",
    releaseNumber: "",
    size: conOneSizeID,
    serialNumber: "124871814",
    hasShelves: false,
    isPainted: false,
    hasOnBoxNumbers: false,
    hasSigns: false,
    rentalResale: "Rental",
    isFlagged: false,
    flagReason: "",
    stats: conOneStatsID
  },
  {
    _id: conTwoID,
    gbrNumber: "99-0002",
    releaseNumber: "",
    size: conTwoSizeID,
    serialNumber: "124211314",
    hasShelves: false,
    isPainted: false,
    hasOnBoxNumbers: false,
    hasSigns: false,
    rentalResale: "Rental",
    isFlagged: false,
    flagReason: "",
    stats: conTwoStatsID
  },
  {
    _id: conThreeID,
    gbrNumber: "99-0002",
    releaseNumber: "",
    size: conThreeSizeID,
    serialNumber: "133211314",
    hasShelves: false,
    isPainted: false,
    hasOnBoxNumbers: false,
    hasSigns: false,
    rentalResale: "Rental",
    isFlagged: true,
    flagReason: "Container is damaged",
    stats: conThreeStatsID
  }
];

const populateContainerSizes = done => {
  ContainerSize.remove({})
    .then(() => {
      var twenty = new ProductType(containerSizes[0]).save();
      var fourty = new ProductType(containerSizes[1]).save();
      var twentydoubledoors = new ProductType(containerSizes[2]).save();

      return Promise.all([twenty, fourty, twentydoubledoors]);
    })
    .then(() => done())
    .catch(e => console.log(e));
};

const populateContainerStats = done => {
  ContainerStats.remove({})
    .then(() => {
      var twenty = new ProductType(containerStats[0]).save();
      var fourty = new ProductType(containerStats[1]).save();
      var twentydoubledoors = new ProductType(containerStats[2]).save();

      return Promise.all([twenty, fourty, twentydoubledoors]);
    })
    .then(() => done())
    .catch(e => console.log(e));
};

const populateContainers = done => {
  Container.remove({})
    .then(() => {
      var twenty = new ProductType(containers[0]).save();
      var fourty = new ProductType(containers[1]).save();
      var twentydoubledoors = new ProductType(containers[2]).save();

      return Promise.all([twenty, fourty, twentydoubledoors]);
    })
    .then(() => done())
    .catch(e => console.log(e));
};

module.exports = {
  populateContainerSizes,
  populateContainerStats,
  populateContainers,
  containerSizes,
  containerStats,
  containers
};
