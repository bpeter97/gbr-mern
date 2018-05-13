const { ObjectID } = require("mongodb");
const expect = require("expect");
const request = require("supertest");

const { app } = require("./../../server");
const PurchaseType = require("./../models/PurchaseType");
const {
  populatePurchaseTypes,
  purchaseTypes
} = require("./seed/purchaseTypeSeed");

// call beforeEach() to run functions before each test.
beforeEach(populatePurchaseTypes);

describe("SETTINGS", () => {
  describe("Purchase Types", () => {
    describe("GET /settings/purchasetypes/", () => {
      it("should return an array of purchase types", done => {
        request(app)
          .get("/api/settings/purchasetypes")
          .expect(200)
          .expect(res => {
            expect(res.body.purchaseTypes).toBeTruthy();
            expect(res.body.purchaseTypes.length).toBe(2);
          })
          .end(done);
      });
    });

    describe("POST /settings/purchasetypes/", () => {
      it("should create a purchase type");
      it("should not create a purchase type with validation errors");
    });

    describe("GET /settings/purchasetypes/:id", () => {
      it("should return a purchase type", done => {
        request(app)
          .get(
            `/api/settings/purchasetypes/${purchaseTypes[0]._id.toHexString()}`
          )
          .expect(200)
          .expect(res => {
            expect(res.body.purchaseType.type).toBe(purchaseTypes[0].type);
          })
          .end(done);
      });

      it("should not return a purchase type with invalid ID", done => {
        request(app)
          .get(
            `/api/settings/purchasetypes/${purchaseTypes[0]._id.toHexString()}sss`
          )
          .expect(400)
          .expect(res => {
            expect(res.body.purchaseType).toBe(
              "There was no purchase type found"
            );
          })
          .end(done);
      });
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
