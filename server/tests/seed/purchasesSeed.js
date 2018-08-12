const { ObjectID } = require("mongodb");
const { purchaseTypes } = require("../seed/purchaseTypeSeed");
const { users } = require("../seed/userSeed");
const { customers } = require("../seed/customerSeed");
const { products } = require("../seed/productSeed");
const { containers } = require("../seed/containerSeed");
const Quote = require("./../../models/Quote");
const Order = require("./../../models/Order");
const PurchasePrices = require("./../../models/PurchasePrices");
const RequestedProduct = require("./../../models/RequestedProduct");
const ContainerDelivery = require("./../../models/ContainerDelivery");

const ppOneID = new ObjectID();
const ppTwoID = new ObjectID();
const quoteOneID = new ObjectID();
const orderOneID = new ObjectID();
const requestedProductOneID = new ObjectID();
const requestedProductTwoID = new ObjectID();
const requestedProductThreeID = new ObjectID();
const requestedProductFourID = new ObjectID();
const containerDeliveryOneID = new ObjectID();

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
  },
  {
    _id: requestedProductThreeID,
    order: orderOneID,
    quote: null,
    productQuantity: 1,
    product: {
      name: "40' Delivery",
      shortName: "40DEL",
      price: 100.0,
      rental: true,
      type: "delivery"
    }
  },
  {
    _id: requestedProductFourID,
    order: orderOneID,
    quote: null,
    productQuantity: 1,
    product: {
      name: "40' Container",
      shortName: "40CON",
      price: 120.0,
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
  },
  {
    _id: ppTwoID,
    priceBeforeTax: 220.0,
    salesTax: 17.6,
    totalPrice: 237.6,
    monthlyPrice: 120.0,
    taxRate: 0.08,
    deliveryTotal: 100.0
  }
];

const containerDeliveries = [
  {
    _id: containerDeliveryOneID,
    driver: users[3]._id,
    notes: null,
    isDelivered: false,
    dateDelivered: null,
    isPickedUp: false,
    pickupDate: null
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

const orders = [
  {
    _id: orderOneID,
    quote: null,
    customer: customers[0]._id,
    purchaseType: purchaseTypes[0]._id,
    creationDate: currentDate,
    startDate: currentDate,
    endDate: null,
    job: {
      name: "Personal Job",
      address: "1733 S. Casablanca St",
      city: "Visalia",
      zipcode: "93292"
    },
    stage: 1,
    purchasePrices: ppTwoID,
    isHidden: false,
    products: [
      {
        quantity: 1,
        product: requestedProductThreeID
      },
      {
        quantity: 1,
        product: requestedProductFourID
      }
    ],
    containers: [
      {
        container: containers[1]._id,
        containerDelivery: containerDeliveryOneID
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

const populateContainerDeliveries = done => {
  ContainerDelivery.remove({})
    .then(() => {
      var cdOne = new ContainerDelivery(containerDeliveries[0]).save();

      return Promise.all([cdOne]);
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

const populateOrders = done => {
  Order.remove({})
    .then(() => {
      var orderOne = new Order(orders[0]).save();

      return Promise.all([orderOne]);
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
  populateContainerDeliveries,
  populateQuotes,
  populateOrders
};
