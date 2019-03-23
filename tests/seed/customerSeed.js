const { ObjectID } = require("mongodb");
const Customer = require("../../models/Customer");

const customerOneID = new ObjectID();
const customerTwoID = new ObjectID();
const customerThreeID = new ObjectID();

customers = [
  {
    _id: customerOneID,
    name: "Jeremy Hill",
    address1: "1234 Address St",
    address2: "",
    city: "Fresno",
    zipcode: "93717",
    state: "CA",
    phone: "559-999-9999",
    ext: "123",
    fax: "559-999-9998",
    email: "some@email.com",
    rdp: "",
    notes: "",
    isFlagged: false,
    flagReason: "",
    lastViewed: null
  },
  {
    _id: customerTwoID,
    name: "Bill Nye",
    address1: "1234 Science St",
    address2: "",
    city: "Sacramento",
    zipcode: "94229",
    state: "CA",
    phone: "559-777-7777",
    ext: "456",
    fax: "559-777-7778",
    email: "wow@gaming.com",
    rdp: "",
    notes: "",
    isFlagged: false,
    flagReason: "",
    lastViewed: null
  },
  {
    _id: customerThreeID,
    name: "Karen Belmont",
    address1: "1234 Loopy St",
    address2: "",
    city: "Hanford",
    zipcode: "93230",
    state: "CA",
    phone: "559-444-4444",
    ext: "123",
    fax: "559-444-4448",
    email: "another@fake.com",
    rdp: "",
    notes: "Customer requires quote everytime before orders",
    isFlagged: true,
    flagReason: "Do not rent, patient hasn't paid bill.",
    lastViewed: null
  }
];

const populateCustomers = done => {
  Customer.deleteMany({})
    .then(() => {
      var customerOne = new Customer(customers[0]).save();
      var customerTwo = new Customer(customers[1]).save();
      var customerThree = new Customer(customers[2]).save();

      return Promise.all([customerOne, customerTwo, customerThree]);
    })
    .then(() => done())
    .catch(e => console.log(e));
};

module.exports = {
  populateCustomers,
  customers
};
