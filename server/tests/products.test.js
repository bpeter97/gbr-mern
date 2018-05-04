const expect = require("expect");
const request = require("supertest");

const { app } = require("./../../server");
const ProductType = require("./../models/ProductType");
const { populateProductTypes, productTypes } = require("./seed/productSeed");

// call beforeEach() to run functions before each test.
beforeEach(populateProductTypes);

// New productType object used for the create product type test.
var newProductType = {
  type: "new type"
};

describe("PRODUCT TYPES", () => {
  describe("GET /products/types", () => {
    it("should retrieve a list of product types", done => {
      request(app)
        .get("/api/products/types")
        .expect(200)
        .expect(res => {
          // check to see if product types array exists.
          expect(res.body.productTypes).toBeTruthy();
          expect(res.body.productTypes.length).toBe(5);
        })
        .end(done);
    });
  });

  describe("POST /products/types", () => {
    it("should create a new product type", done => {
      request(app)
        .post("/api/products/types")
        .send(newProductType)
        .expect(200)
        .expect(res => {
          // check to see if new product type exists.
          expect(res.body.type).toBe(newProductType.type);
        })
        .end(err => {
          if (err) {
            return done(err);
          }

          // Check to see if it was inserted into db properly.
          ProductType.findOne({ type: newProductType.type })
            .then(result => {
              expect(result.type).toBe(newProductType.type);
              done();
            })
            .catch(e => done(e));
        });
    });

    it("should not create a new product type with empty values", done => {
      request(app)
        .post("/api/products/types")
        .send({ type: "" })
        .expect(400)
        .expect(res => {
          // check to see if new product type exists.
          expect(res.body.type).toBe("Type is required.");
        })
        .end(err => {
          if (err) {
            return done(err);
          }

          // Check to see if it was inserted into db properly.
          ProductType.findOne({ type: newProductType.type })
            .then(result => {
              expect(result).toBeFalsy();
              done();
            })
            .catch(e => done(e));
        });
    });
  });
});
