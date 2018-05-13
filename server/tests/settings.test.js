const { ObjectID } = require("mongodb");
const expect = require("expect");
const request = require("supertest");

const { app } = require("./../../server");
const ProductType = require("./../models/ProductType");
const Product = require("./../models/Product");
const {
  populatePurchaseTypes,
  purchaseTypes
} = require("./seed/purchaseTypeSeed");

// call beforeEach() to run functions before each test.
beforeEach(populatePurchaseTypes);

describe("SETTINGS", () => {
  describe("Purchase Types", () => {
    describe("GET /settings/purchasetypes/", () => {
      it("should return an array of purchase types");
    });

    describe("POST /settings/purchasetypes/", () => {
      it("should create a purchase type");
      it("should not create a purchase type with validation errors");
    });

    describe("GET /settings/purchasetypes/:id", () => {
      it("should return a purchase type");
      it("should not return a purchase type with invalid ID");
    });

    describe("PATCH /settings/purchasetypes/:id", () => {
      it("should update a purchase type");
      it("should not update a purchase type with invalid ID");
      it("should not update a purchase type with validation errors");
    });

    describe("DELETE /settings/purchasetypes/:id", () => {
      it("should delete a purchase type");
      it("should not delete a purchase type with invalid ID");
    });
  });
});
