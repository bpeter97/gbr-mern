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
  var newQuote = {};

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
    it("should create a quote and return it");
    it("should not create a quote if not logged in");
    it("should not create a quote with validation errors");
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
    it("should update a quote");
    it("should not update quote with validation errors");
    it("should not update quote if not logged in");
    it("should not update quote with invalid ID");
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
