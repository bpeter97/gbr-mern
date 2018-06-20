const expect = require("expect");
const request = require("supertest");

const { app } = require("./../../server");
const User = require("./../models/User");
const { populateUsers, users } = require("./seed/userSeed");
const { populateCustomers, customers } = require("./seed/customerSeed");
const { populateProducts, products } = require("./seed/productSeed");
const {
  requestedProducts,
  productPrices,
  quotes,
  populateRequestedProducts,
  populatePurchasePrices,
  populateQuotes
} = require("./seed/quoteSeed");
const {
  populatePurchaseTypes,
  purchaseTypes
} = require("./seed/purchaseTypeSeed");

describe("QUOTES", () => {
  // call beforeEach() to run functions before each test.
  beforeEach(populateUsers);
  beforeEach(populateProducts);
  beforeEach(populatePurchaseTypes);
  beforeEach(populateCustomers);
  beforeEach(populateRequestedProducts);
  beforeEach(populatePurchasePrices);
  beforeEach(populateQuotes);

  // New quote object
  var newQuote = {
    customer: customers[1]._id.toHexString(),
    purchaseType: purchaseTypes[1]._id,
    attention: "Brian",
    products: [
      {
        quantity: 1,
        product: {
          name: "20' Delivery",
          shortName: "20DEL",
          price: 900.0,
          rental: false,
          type: "delivery"
        }
      },
      {
        quantity: 1,
        product: {
          name: "20' Container",
          shortName: "20CON",
          price: 1000.0,
          rental: true,
          type: "container"
        }
      }
    ],
    priceBeforeTax: 190.0,
    salesTax: 7.2,
    totalPrice: 197.2,
    monthlyPrice: 100.0,
    taxRate: 0.08,
    deliveryTotal: 90.0
  };

  // Update quote object
  var updateQuote = {
    _id: quotes[0]._id.toHexString(),
    customer: quotes[0].customer.toHexString(),
    purchaseType: quotes[0].purchaseType.toHexString(),
    purchasePrices: quotes[0].purchasePrices.toHexString(),
    createdBy: quotes[0].createdBy.toHexString(),
    isHidden: quotes[0].isHidden,
    status: quotes[0].status,
    attention: quotes[0].attention,
    creationDate: quotes[0].creationDate,
    expirationDate: quotes[0].expirationDate,
    products: [
      {
        quantity: 1,
        product: {
          name: "20' Delivery",
          shortName: "20DEL",
          price: 95.0,
          rental: false,
          type: "delivery"
        }
      },
      {
        quantity: 1,
        product: {
          name: "20' Container",
          shortName: "20CON",
          price: 150.0,
          rental: true,
          type: "container"
        }
      }
    ],
    priceBeforeTax: 245.0,
    salesTax: 19.6,
    totalPrice: 264.6,
    monthlyPrice: 150.0,
    taxRate: 0.08,
    deliveryTotal: 95.0
  };

  describe("GET /quotes", () => {
    it("should return all quotes that are not hidden", done => {
      request(app)
        .get("/api/quotes")
        .set("Authorization", users[0].token)
        .expect(200)
        .expect(res => {
          expect(res.body[0].customer.name).toBe(customers[0].name);
        })
        .end(done);
    });
    it("should not return quotes if not logged in", done => {
      request(app)
        .get("/api/quotes")
        .expect(401)
        .expect(res => {
          expect(res.body.auth).toBe("Authorization failed");
        })
        .end(done);
    });
  });

  describe("POST /quotes", () => {
    it("should create a quote and return it", done => {
      request(app)
        .post("/api/quotes")
        .send(newQuote)
        .set("Authorization", users[0].token)
        .expect(200)
        .expect(res => {
          expect(res.body.customer).toBe(newQuote.customer);
          expect(res.body.attention).toBe(newQuote.attention);
          expect(res.body.isHidden).toBe(false);
        })
        .end(done);
    });
    it("should not create a quote if not logged in", done => {
      request(app)
        .post("/api/quotes")
        .send(newQuote)
        .expect(401)
        .expect(res => {
          expect(res.body.auth).toBe("Authorization failed");
        })
        .end(done);
    });
    it("should not create a quote with validation errors", done => {
      newQuote.purchaseType = "not a number";

      request(app)
        .post("/api/quotes")
        .send(newQuote)
        .set("Authorization", users[0].token)
        .expect(400)
        .expect(res => {
          expect(res.body.purchaseType).toBe(
            "Purchase type selected does not exist"
          );
        })
        .end(done);
    });
  });

  describe("GET /quotes/customer/:id", () => {
    it("should return all of a customer's quotes that are not hidden", done => {
      request(app)
        .get(`/api/quotes/customer/${customers[0]._id}`)
        .set("Authorization", users[0].token)
        .expect(200)
        .expect(res => {
          expect(res.body.length).toBe(1);
          expect(res.body[0].customer.name).toBe(customers[0].name);
        })
        .end(done);
    });
    it("should not return quotes if not logged in", done => {
      request(app)
        .get(`/api/quotes/customer/${customers[0]._id}`)
        .expect(401)
        .expect(res => {
          expect(res.body.auth).toBe("Authorization failed");
        })
        .end(done);
    });
    it("should not return quotes with invalid ID", done => {
      request(app)
        .get(`/api/quotes/customer/${customers[0]._id}ss`)
        .set("Authorization", users[0].token)
        .expect(400)
        .expect(res => {
          expect(res.body.quote).toBe(
            "There were no quotes found for this customer"
          );
        })
        .end(done);
    });
  });

  describe("GET /quotes/user/:id", () => {
    it("should return all of a user's created quotes that are not hidden", done => {
      request(app)
        .get(`/api/quotes/user/${users[0]._id}`)
        .set("Authorization", users[0].token)
        .expect(200)
        .expect(res => {
          expect(res.body.length).toBe(1);
          expect(res.body[0].createdBy.firstName).toBe(users[0].firstName);
        })
        .end(done);
    });
    it("should not return quotes if not logged in", done => {
      request(app)
        .get(`/api/quotes/user/${users[0]._id}`)
        .expect(401)
        .expect(res => {
          expect(res.body.auth).toBe("Authorization failed");
        })
        .end(done);
    });
    it("should not return quotes with invalid user ID", done => {
      request(app)
        .get(`/api/quotes/user/${users[0]._id}ss`)
        .set("Authorization", users[0].token)
        .expect(400)
        .expect(res => {
          expect(res.body.quote).toBe(
            "There were no quotes found for this user"
          );
        })
        .end(done);
    });
  });

  describe("GET /quotes/:id", () => {
    it("should return a quote", done => {
      request(app)
        .get(`/api/quotes/${quotes[0]._id}`)
        .set("Authorization", users[0].token)
        .expect(200)
        .expect(res => {
          expect(res.body.customer._id).toBe(quotes[0].customer.toHexString());
        })
        .end(done);
    });
    it("should not return quote if not logged in", done => {
      request(app)
        .get(`/api/quotes/${quotes[0]._id}`)
        .expect(401)
        .expect(res => {
          expect(res.body.auth).toBe("Authorization failed");
        })
        .end(done);
    });
    it("should not return quote with invalid ID", done => {
      request(app)
        .get(`/api/quotes/${quotes[0]._id}ss`)
        .set("Authorization", users[0].token)
        .expect(400)
        .expect(res => {
          expect(res.body.quote).toBe("There was no quote found");
        })
        .end(done);
    });
  });

  describe("PATCH /quotes/:id", () => {
    it("should update a quote", done => {
      request(app)
        .patch(`/api/quotes/${updateQuote._id}`)
        .send(updateQuote)
        .set("Authorization", users[0].token)
        .expect(200)
        .expect(res => {
          expect(res.body._id).toBe(updateQuote._id);
        })
        .end(done);
    });
    it("should not update quote if not logged in", done => {
      request(app)
        .patch(`/api/quotes/${updateQuote._id}`)
        .send(updateQuote)
        .expect(401)
        .expect(res => {
          expect(res.body.auth).toBe("Authorization failed");
        })
        .end(done);
    });
    it("should not update quote with invalid ID", done => {
      request(app)
        .patch(`/api/quotes/${updateQuote._id}sss`)
        .send(updateQuote)
        .set("Authorization", users[0].token)
        .expect(400)
        .expect(res => {
          expect(res.body.quote).toBe("No quote found");
        })
        .end(done);
    });
    it("should not update quote with validation errors", done => {
      updateQuote.purchasePrices = "sd235523";

      request(app)
        .patch(`/api/quotes/${updateQuote._id}`)
        .send(updateQuote)
        .set("Authorization", users[0].token)
        .expect(400)
        .expect(res => {
          expect(res.body.purchasePrices).toBe(
            "There is an issue with the quote's purchase prices"
          );
        })
        .end(done);
    });
  });

  describe("DELETE /quotes/:id", () => {
    it("should delete a quote", done => {
      request(app)
        .delete(`/api/quotes/${quotes[0]._id}`)
        .set("Authorization", users[0].token)
        .expect(200)
        .expect(res => {
          expect(res.body.customer.name).toBe(customers[0].name);
        })
        .end(done);
    });
    it("should not delete quote if not logged in", done => {
      request(app)
        .delete(`/api/quotes/${quotes[0]._id}`)
        .expect(401)
        .expect(res => {
          expect(res.body.auth).toBe("Authorization failed");
        })
        .end(done);
    });
    it("should not delete quote with invalid ID", done => {
      request(app)
        .delete(`/api/quotes/${quotes[0]._id}ss`)
        .set("Authorization", users[0].token)
        .expect(400)
        .expect(res => {
          expect(res.body.quote).toBe("There was no quote found");
        })
        .end(done);
    });
  });
});
