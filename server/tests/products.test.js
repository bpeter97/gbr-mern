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
  // Test the post /register route.
  describe("GET /products/types", () => {
    it("should retrieve a list of product types", done => {
      request(app)
        .get("/api/products/types")
        .expect(200)
        .expect(res => {
          // Check to see if body contains users information. If so,
          // then the user's information was passed back meaning it succeeded.
          expect(res.body.productTypes).toBeTruthy();
          expect(res.body.productTypes.length).toBe(5);
        })
        .end(done);
    });
  });
});
