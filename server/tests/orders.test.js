const expect = require("expect");
const request = require("supertest");

const { app } = require("./../../server");
const User = require("./../models/User");

const { populateUsers, users } = require("./seed/userSeed");
const { populateCustomers, customers } = require("./seed/customerSeed");
const { populateProducts, products } = require("./seed/productSeed");
const {
  requestedProducts,
  purchasePrices,
  quotes,
  orders,
  populateRequestedProducts,
  populatePurchasePrices,
  populateContainerDeliveries,
  populateQuotes,
  populateOrders
} = require("./seed/purchasesSeed");
const {
  populatePurchaseTypes,
  purchaseTypes
} = require("./seed/purchaseTypeSeed");
const {
  populateContainerSizes,
  populateContainerStats,
  populateContainers,
  containerSizes,
  containerStats,
  containers
} = require("./seed/containerSeed");

describe("ORDERS", () => {
  beforeEach(populateUsers);
  beforeEach(populateProducts);
  beforeEach(populatePurchaseTypes);
  beforeEach(populateCustomers);
  beforeEach(populateRequestedProducts);
  beforeEach(populatePurchasePrices);
  beforeEach(populateContainerSizes);
  beforeEach(populateContainerStats);
  beforeEach(populateContainers);
  beforeEach(populateContainerDeliveries);
  beforeEach(populateOrders);

  describe("GET /orders", () => {
    it("should return all orders that are not hidden", done => {
      request(app)
        .get("/api/orders")
        .set("Authorization", users[0].token)
        .expect(200)
        .expect(res => {
          expect(res.body.length).toBe(orders.length);
        })
        .end(done);
    });
    it("should not return orders if the user is not logged in", done => {
      request(app)
        .get("/api/orders")
        .expect(401)
        .expect(res => {
          expect(res.body.auth).toBe("Authorization failed");
        })
        .end(done);
    });
  });

  describe("POST /orders", () => {
    it("should create an order and return it");
    it("should not create an order with validation errors");
    it("should not create an order if user is not logged in");
  });

  describe("GET /orders/customer/:id", () => {
    // May want to change this to not depend on the orders being hidden.
    it("should return all of a customer's orders that are not hidden");
    it("should not return orders if user is not logged in");
    it("should not return orders if supplied an invalid ID");
  });

  describe("GET /orders/user/:id", () => {
    // May want to change this to not depend on the orders being hidden.
    it("should return all of a user's created orders that are not hidden");
    it("should not return orders if user is not logged in");
    it("should not return orders if supplied an invalid ID");
  });

  describe("GET /orders/:id", () => {
    it("should return an order with the ID matching the provided ID");
    it("should not return an order if not logged in");
    it("should not return an order if supplied an invalid ID");
  });

  describe("PATCH /orders/:id", () => {
    it("should update and return an order");
    it("should not update an order if not logged in");
    it("should not update an order with improper ID");
    it("should not update an order with validation errors");
  });

  describe("DELETE /orders/:id", () => {
    it("should delete an order", done => {
      request(app)
        .del(`/api/orders/${orders[0]._id}`)
        .set("Authorization", users[0].token)
        .expect(200)
        .expect(res => {
          expect(res.body._id).toBe(orders[0]._id);
        })
        .end(done);
    });
    it("should not delete an order if not logged in", done => {
      request(app)
        .del(`/api/orders/${orders[0]._id}`)
        .expect(401)
        .expect(res => {
          expect(res.body.auth).toBe("Authorization failed");
        })
        .end(done);
    });
    it("should not delete an order with an invalid ID", done => {
      request(app)
        .del(`/api/orders/${orders[0]._id}sssssss`)
        .set("Authorization", users[0].token)
        .expect(400)
        .expect(res => {
          expect(res.body.order).toBe("There was no order found");
        })
        .end(done);
    });
  });
});
