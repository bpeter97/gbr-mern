const { ObjectID } = require("mongodb");
const ProductType = require("../../models/ProductType");

const modificationID = new ObjectID();
const containerID = new ObjectID();
const rentalModificationID = new ObjectID();
const deliveryID = new ObjectID();
const pickupID = new ObjectID();

const lockboxProdID = new ObjectID();
const deliveryProdID = new ObjectID();
const containerProdID = new ObjectID();

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

const products = [
  {
    _id: lockboxProdID,
    name: "Lock Box",
    shortName: "LBOX",
    price: 100.0,
    monthlyPrice: 0.0,
    rental: false,
    type: modificationID
  },
  {
    _id: deliveryProdID,
    name: "20' Delivery",
    shortName: "20DEL",
    price: 90.0,
    monthlyPrice: 0.0,
    rental: false,
    type: deliveryID
  },
  {
    _id: containerProdID,
    name: "20' Container",
    shortName: "20CON",
    price: 0.0,
    monthlyPrice: 100.0,
    rental: false,
    type: containerID
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

const populateProducts = done => {
  Product.remove({})
    .then(() => {
      var lockbox = new Product(products[0]).save();
      var delivery = new Product(products[1]).save();
      var container = new Product(products[2]).save();

      return Promise.all([lockbox, delivery, container]);
    })
    .then(() => done())
    .catch(e => console.log(e));
};

module.exports = {
  populateProductTypes,
  productTypes,
  populateProducts,
  products
};
