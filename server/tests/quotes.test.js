const expect = require("expect");
const request = require("supertest");

const { app } = require("./../../server");
const User = require("./../models/User");
const { populateUsers, users } = require("./seed/userSeed");
const { populateCustomers, customers } = require("./seed/customerSeed");
const { populateProducts, products } = require("./seed/productSeed");
const { pupulateQuotes, quotes } = require("./seed/quoteSeed");
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
  beforeEach(pupulateQuotes);

  // New quote object
  var newQuote = {};

  describe("GET /quotes", () => {
    it("should return all quotes that are not hidden");
    it("should not return quotes if not logged in");
  });

  describe("POST /quotes", () => {
    it("should create a quote and return it");
    it("should not create a quote if not logged in");
    it("should not create a quote with validation errors");
  });

  describe("GET /quotes/customer/:id", () => {
    it("should return all of a customer's quotes that are not hidden");
    it("should not return quotes if not logged in");
    it("should not return quotes with invalid ID");
  });

  describe("GET /quotes/user/:id", () => {
    it("should return all of a user's created quotes that are not hidden");
    it("should not return quotes if not logged in");
    it("should not return quotes with invalid user ID");
  });

  describe("GET /quotes/:id", () => {
    it("should return a quote");
    it("should not return quote if not logged in");
    it("should not return quote with invalid ID");
  });

  describe("PATCH /quotes/:id", () => {
    it("should update a quote");
    it("should not update quote with validation errors");
    it("should not update quote if not logged in");
    it("should not update quote with invalid ID");
  });

  describe("DELETE /quotes/:id", () => {
    it("should delete a quote");
    it("should not delete quote if not logged in");
    it("should not delete quote with invalid ID");
  });
});
