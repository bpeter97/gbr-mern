const { ObjectID } = require("mongodb");
const bcrypt = require("bcryptjs");
const { purchaseTypes } = require("../../tests/seed/purchaseTypeSeed");
const { users } = require("../../tests/seed/userSeed");
const { customers } = require("../../tests/seed/customerSeed");
const { products } = require("../../tests/seed/productSeed");
const Quote = require("./../../models/Quote");
const PurchasePrices = require("./../../models/PurchasePrices");
const RequestedProduct = require("./../../models/RequestedProduct");

const ppOneID = new ObjectID();
const quoteOneID = new ObjectID();
const requestedProductOneID = new ObjectID();
const requestedProductTwoID = new ObjectID();

const currentDate = new Date();
const expirationDate = new Date();
expirationDate.setMonth(expirationDate.getMonth() + 1);

var requestedProducts = [
  {
    _id: requestedProductOneID,
    order: null,
    quote: quoteOneID,
    productQuantity: 1,
    product: {
      name: "20' Delivery",
      shortName: "20DEL",
      price: 90.0,
      rental: false,
      type: "delivery"
    }
  },
  {
    _id: requestedProductTwoID,
    order: null,
    quote: quoteOneID,
    productQuantity: 1,
    product: {
      name: "20' Container",
      shortName: "20CON",
      price: 100.0,
      rental: true,
      type: "container"
    }
  }
];

var purchasePrices = [
  {
    _id: ppOneID,
    priceBeforeTax: 190.0,
    salesTax: 7.2,
    totalPrice: 197.2,
    monthlyPrice: 100.0,
    taxRate: 0.08,
    deliveryTotal: 90.0
  }
];

var quotes = [
  {
    _id: quoteOneID,
    customer: customers[0]._id,
    purchaseType: purchaseTypes[0]._id,
    creationDate: currentDate,
    expirationDate: expirationDate,
    status: "Open",
    attention: "Jeremy",
    isHidden: false,
    purchasePrices: ppOneID,
    products: [
      {
        quantity: 1,
        product: requestedProductOneID
      },
      {
        quantity: 1,
        product: requestedProductTwoID
      }
    ],
    createdBy: users[0]._id
  }
];

const populateRequestedProducts = done => {
  RequestedProduct.remove({})
    .then(() => {
      var requestedProductOne = new RequestedProduct(
        requestedProducts[0]
      ).save();
      var requestedProductTwo = new RequestedProduct(
        requestedProducts[1]
      ).save();

      return Promise.all([requestedProductOne, requestedProductTwo]);
    })
    .then(() => done())
    .catch(e => console.log(e));
};

const populatePurchasePrices = done => {
  PurchasePrices.remove({})
    .then(() => {
      var ppOne = new PurchasePrices(purchasePrices[0]).save();

      return Promise.all([ppOne]);
    })
    .then(() => done())
    .catch(e => console.log(e));
};

const populateQuotes = done => {
  Quote.remove({})
    .then(() => {
      var quoteOne = new Quote(quotes[0]).save();

      return Promise.all([quoteOne]);
    })
    .then(() => done())
    .catch(e => console.log(e));
};

module.exports = {
  requestedProducts,
  purchasePrices,
  quotes,
  populateRequestedProducts,
  populatePurchasePrices,
  populateQuotes
};
