const { ObjectID } = require("mongodb");
const ProductType = require("../../models/ProductType");

const modificationID = new ObjectID();
const containerID = new ObjectID();
const rentalModificationID = new ObjectID();
const deliveryID = new ObjectID();
const pickupID = new ObjectID();

const productTypes = [
  {
    _id: modificationID,
    type: "modification"
  },
  {
    _id: containerID,
    type: "container"
  },
  {
    _id: rentalModificationID,
    type: "rentalModification"
  },
  {
    _id: deliveryID,
    type: "delivery"
  },
  {
    _id: pickupID,
    type: "pickup"
  }
];

const populateProductTypes = done => {
  ProductType.remove({})
    .then(() => {
      var modification = new ProductType(productTypes[0]).save();
      var container = new ProductType(productTypes[1]).save();
      var rentalModification = new ProductType(productTypes[2]).save();
      var delivery = new ProductType(productTypes[3]).save();
      var pickup = new ProductType(productTypes[4]).save();

      return Promise.all([
        modification,
        container,
        rentalModification,
        delivery,
        pickup
      ]);
    })
    .then(() => done())
    .catch(e => console.log(e));
};

module.exports = {
  populateProductTypes,
  productTypes
};
