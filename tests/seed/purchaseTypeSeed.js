const { ObjectID } = require("mongodb");
const PurchaseType = require("../../models/PurchaseType");

const purchaseTypeOneID = new ObjectID();
const purchaseTypeTwoID = new ObjectID();

purchaseTypes = [
  {
    _id: purchaseTypeOneID,
    type: "Rental"
  },
  {
    _id: purchaseTypeTwoID,
    type: "Sales"
  }
];

const populatePurchaseTypes = done => {
  PurchaseType.deleteMany({})
    .then(() => {
      var purchaseTypeOne = new PurchaseType(purchaseTypes[0]).save();
      var purchaseTypeTwo = new PurchaseType(purchaseTypes[1]).save();
      return Promise.all([purchaseTypeOne, purchaseTypeTwo]);
    })
    .then(() => done())
    .catch(e => console.log(e));
};

module.exports = {
  populatePurchaseTypes,
  purchaseTypes
};
