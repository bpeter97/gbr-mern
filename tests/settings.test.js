const { ObjectID } = require("mongodb");
const expect = require("expect");
const request = require("supertest");

const { app } = require("./../../server");
const PurchaseType = require("./../models/PurchaseType");
const {
  populatePurchaseTypes,
  purchaseTypes
} = require("./seed/purchaseTypeSeed");
const { populateUsers, users } = require("./seed/userSeed");

describe("SETTINGS", () => {
  before(populateUsers);
  describe("Purchase Types", () => {
    // call beforeEach() to run functions before each test.
    beforeEach(populatePurchaseTypes);
    describe("GET /settings/purchasetypes/", () => {
      it("should return an array of purchase types", done => {
        request(app)
          .get("/api/settings/purchasetypes")
          .set("Authorization", users[0].token)
          .expect(200)
          .expect(res => {
            expect(res.body.length).toBe(2);
          })
          .end(done);
      });
    });

    describe("POST /settings/purchasetypes/", () => {
      it("should create a purchase type", done => {
        request(app)
          .post("/api/settings/purchasetypes")
          .set("Authorization", users[0].token)
          .send({ type: "Resale" })
          .expect(200)
          .expect(res => {
            expect(res.body.type).toBe("Resale");
          })
          .end(err => {
            if (err) {
              return done(err);
            }

            PurchaseType.findOne({ type: "Resale" })
              .then(purchaseType => {
                expect(purchaseType).toBeTruthy();
                expect(purchaseType.type).toBe("Resale");
                done();
              })
              .catch(e => done(e));
          });
      });
      it("should not create a purchase type with validation errors", done => {
        request(app)
          .post("/api/settings/purchasetypes")
          .set("Authorization", users[0].token)
          .send({ type: "" })
          .expect(400)
          .expect(res => {
            expect(res.body.type).toBe("Purchase type is required");
          })
          .end(done);
      });
    });

    describe("GET /settings/purchasetypes/:id", () => {
      it("should return a purchase type", done => {
        request(app)
          .get(
            `/api/settings/purchasetypes/${purchaseTypes[0]._id.toHexString()}`
          )
          .set("Authorization", users[0].token)
          .expect(200)
          .expect(res => {
            expect(res.body.type).toBe(purchaseTypes[0].type);
          })
          .end(done);
      });

      it("should not return a purchase type with invalid ID", done => {
        request(app)
          .get(
            `/api/settings/purchasetypes/${purchaseTypes[0]._id.toHexString()}sss`
          )
          .set("Authorization", users[0].token)
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
      it("should update a purchase type", done => {
        request(app)
          .patch(`/api/settings/purchasetypes/${purchaseTypes[1]._id}`)
          .set("Authorization", users[0].token)
          .send({ type: "Resale" })
          .expect(200)
          .expect(res => {
            expect(res.body.type).toBe("Resale");
          })
          .end(err => {
            if (err) {
              return done(err);
            }

            PurchaseType.findById(purchaseTypes[1]._id)
              .then(purchaseType => {
                expect(purchaseType).toBeTruthy();
                expect(purchaseType.type).toBe("Resale");
                done();
              })
              .catch(e => done(e));
          });
      });
      it("should not update a purchase type with invalid ID", done => {
        request(app)
          .patch(`/api/settings/purchasetypes/${purchaseTypes[1]._id}ssss`)
          .set("Authorization", users[0].token)
          .send({ type: "Resale" })
          .expect(400)
          .expect(res => {
            expect(res.body.purchaseType).toBe("No purchase type found");
          })
          .end(err => {
            if (err) {
              return done(err);
            }

            PurchaseType.findById(purchaseTypes[1]._id)
              .then(purchaseType => {
                expect(purchaseType.type).toBe(purchaseTypes[1].type);
                done();
              })
              .catch(e => done(e));
          });
      });
      it("should not update a purchase type with validation errors", done => {
        request(app)
          .patch(`/api/settings/purchasetypes/${purchaseTypes[1]._id}`)
          .set("Authorization", users[0].token)
          .send({ type: "" })
          .expect(400)
          .expect(res => {
            expect(res.body.type).toBe("Purchase type is required");
          })
          .end(err => {
            if (err) {
              return done(err);
            }

            PurchaseType.findById(purchaseTypes[1]._id)
              .then(purchaseType => {
                expect(purchaseType.type).toBe(purchaseTypes[1].type);
                done();
              })
              .catch(e => done(e));
          });
      });
    });

    describe("DELETE /settings/purchasetypes/:id", () => {
      it("should delete a purchase type", done => {
        request(app)
          .delete(`/api/settings/purchasetypes/${purchaseTypes[0]._id}`)
          .set("Authorization", users[0].token)
          .expect(200)
          .expect(res => {
            expect(res.body.type).toBe(purchaseTypes[0].type);
          })
          .end(err => {
            if (err) {
              return done(err);
            }

            PurchaseType.findById(purchaseTypes[0]._id)
              .then(purchaseType => {
                expect(purchaseType).toBeFalsy();
                done();
              })
              .catch(e => done(e));
          });
      });
      it("should not delete a purchase type with invalid ID", done => {
        request(app)
          .delete(`/api/settings/purchasetypes/${purchaseTypes[0]._id}sss`)
          .set("Authorization", users[0].token)
          .expect(400)
          .expect(res => {
            expect(res.body.purchaseType).toBe("No purchase type found");
          })
          .end(err => {
            if (err) {
              return done(err);
            }

            PurchaseType.findById(purchaseTypes[0]._id)
              .then(purchaseType => {
                expect(purchaseType).toBeTruthy();
                expect(purchaseType.type).toBe(purchaseTypes[0].type);
                done();
              })
              .catch(e => done(e));
          });
      });
    });
  });
});
