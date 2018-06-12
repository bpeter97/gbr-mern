const { ObjectID } = require("mongodb");
const expect = require("expect");
const request = require("supertest");

const { app } = require("./../../server");
const ProductType = require("./../models/ProductType");
const Product = require("./../models/Product");
const {
  populateProductTypes,
  productTypes,
  populateProducts,
  products
} = require("./seed/productSeed");
const { populateUsers, users } = require("./seed/userSeed");

// New productType object used for the create product type test.
var newProductType = {
  type: "new type"
};

var newProduct = {
  name: "20' Pickup",
  shortName: "20PU",
  price: 90.0,
  monthlyPrice: 0.0,
  rental: false,
  type: `${productTypes[0]._id.toHexString()}`,
};

describe("PRODUCT TYPES", () => {
  before(populateUsers);
  // call beforeEach() to run functions before each test.
  beforeEach(populateProductTypes);
  describe("GET /products/types", () => {
    it("should retrieve a array of product types", done => {
      request(app)
        .get("/api/products/types")
        .set("Authorization", users[0].token)
        .expect(200)
        .expect(res => {
          // check to see if product types array exists.
          expect(res.body.length).toBe(5);
        })
        .end(done);
    });
  });

  describe("POST /products/types", () => {
    it("should create a new product type", done => {
      request(app)
        .post("/api/products/types")
        .set("Authorization", users[0].token)
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
        .set("Authorization", users[0].token)
        .send({ type: "" })
        .expect(400)
        .expect(res => {
          // check to see if new product type exists.
          expect(res.body.type).toBe("Type is required");
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

  describe("GET /products/types/:id", () => {
    it("should retrieve a specific type", done => {
      request(app)
        .get(`/api/products/types/${productTypes[0]._id.toHexString()}`)
        .set("Authorization", users[0].token)
        .expect(200)
        .expect(res => {
          expect(res.body.type).toBe("modification");
        })
        .end(done);
    });

    it("should return a 400 error if type not found and error message", done => {
      request(app)
        .get(`/api/products/types/${productTypes[0]._id.toHexString()}sss`)
        .set("Authorization", users[0].token)
        .expect(400)
        .expect(res => {
          expect(res.body.type).toBe("There was no product type found");
        })
        .end(done);
    });
  });

  describe("PATCH /products/types/:id", () => {
    it("should update a specific type", done => {
      request(app)
        .patch(`/api/products/types/${productTypes[0]._id.toHexString()}`)
        .set("Authorization", users[0].token)
        .send({
          type: "new modification"
        })
        .expect(200)
        .expect(res => {
          expect(res.body.type).toBe("new modification");
        })
        .end(done);
    });

    it("should return a 400 error if no type is entered", done => {
      request(app)
        .patch(`/api/products/types/${productTypes[0]._id.toHexString()}`)
        .set("Authorization", users[0].token)
        .expect(400)
        .expect(res => {
          expect(res.body.type).toBe("Type is required");
        })
        .end(done);
    });

    it("should not update a type with a type that is in use", done => {
      request(app)
        .patch(`/api/products/types/${productTypes[0]._id.toHexString()}`)
        .set("Authorization", users[0].token)
        .send({
          type: "container"
        })
        .expect(400)
        .expect(res => {
          expect(res.body.type).toBe("That type is already being used");
        })
        .end(done);
    });

    it("should not update a type with a messed up ID", done => {
      request(app)
        .patch(`/api/products/types/${productTypes[0]._id.toHexString()}sss`)
        .set("Authorization", users[0].token)
        .send({
          type: "some new mod"
        })
        .expect(400)
        .expect(res => {
          expect(res.body.type).toBe(
            "No product found with that ID in the URL"
          );
        })
        .end(done);
    });
  });

  describe("DELETE /products/types/:id", () => {
    it("should remove a specific type", done => {
      request(app)
        .delete(`/api/products/types/${productTypes[0]._id.toHexString()}`)
        .set("Authorization", users[0].token)
        .expect(200)
        .expect(res => {
          expect(res.body.type).toBe(productTypes[0].type);
        })
        .end(err => {
          if (err) {
            return done(err);
          }

          ProductType.findById(productTypes[0]._id.toHexString())
            .then(type => {
              expect(type).toBeFalsy();
              done();
            })
            .catch(e => done(e));
        });
    });

    it("should return 400 and an error message if id is invalid", done => {
      request(app)
        .delete(`/api/products/types/${productTypes[0]._id.toHexString()}ss`)
        .set("Authorization", users[0].token)
        .expect(400)
        .expect(res => {
          expect(res.body.type).toBe("There was no product type found");
        })
        .end(done);
    });

    it("should return 404 and an error message if id is not found", done => {
      request(app)
        .delete(`/api/products/types/${new ObjectID().toHexString()}`)
        .set("Authorization", users[0].token)
        .expect(404)
        .expect(res => {
          expect(res.body.type).toBe(
            "Unable to find and remove the product type"
          );
        })
        .end(done);
    });
  });
});

describe("PRODUCTS", () => {
  beforeEach(populateProducts);

  describe("GET /products", () => {
    it("should retrieve a array of products", done => {
      request(app)
        .get("/api/products")
        .set("Authorization", users[0].token)
        .expect(200)
        .expect(res => {
          expect(res.body.length).toBe(3);
        })
        .end(done);
    });
  });

  describe("POST /products", () => {
    it("should create a product", done => {
      request(app)
        .post("/api/products")
        .set("Authorization", users[0].token)
        .send(newProduct)
        .expect(200)
        .expect(res => {
          // check to see if new product exists.
          expect(res.body.name).toBe(newProduct.name);
        })
        .end(err => {
          if (err) {
            return done(err);
          }

          // Check to see if it was inserted into db properly.
          Product.findOne({ name: newProduct.name })
            .then(result => {
              expect(result).toBeTruthy();
              done();
            })
            .catch(e => done(e));
        });
    });

    it("should not create a product with validation errors", done => {
      newProduct.name = "";
      newProduct.shortName = "";
      newProduct.rental = "";
      newProduct.type = "";

      request(app)
        .post("/api/products")
        .set("Authorization", users[0].token)
        .send(newProduct)
        .expect(400)
        .expect(res => {
          // check to see if new product exists.
          expect(res.body.name).toBe("Name is required");
          expect(res.body.shortName).toBe("Short name is required");
          expect(res.body.rental).toBe("Must select a rental type");
          expect(res.body.type).toBe("Must select a product type");
        })
        .end(err => {
          if (err) {
            return done(err);
          }

          // Check to see if it was inserted into db properly.
          Product.findOne({ name: newProduct.name })
            .then(result => {
              expect(result).toBeFalsy();
              done();
            })
            .catch(e => done(e));
        });
    });
  });

  describe("GET /products/:id", () => {
    it("should retrieve a specific product", done => {
      request(app)
        .get(`/api/products/${products[0]._id.toHexString()}`)
        .set("Authorization", users[0].token)
        .expect(200)
        .expect(res => {
          expect(res.body.name).toBe(products[0].name);
        })
        .end(done);
    });

    it("should have 400 status and error message if id doesn't exist", done => {
      request(app)
        .get(`/api/products/${products[0]._id.toHexString()}ss`)
        .set("Authorization", users[0].token)
        .expect(400)
        .expect(res => {
          expect(res.body.product).toBe("There was no product found");
        })
        .end(done);
    });
  });

  describe("PATCH /products/:id", () => {
    it("should update a specific product", done => {
      newProduct = {
        name: "40' Pickup",
        shortName: "40PU",
        price: 110.0,
        monthlyPrice: 0.0,
        rental: false,
        type: `${productTypes[0]._id.toHexString()}`
      };

      request(app)
        .patch(`/api/products/${products[0]._id.toHexString()}`)
        .set("Authorization", users[0].token)
        .send(newProduct)
        .expect(200)
        .expect(res => {
          expect(res.body.name).toBe("40' Pickup");
        })
        .end(done);
    });

    it("should have 400 status and error message if id doesn't exist", done => {
      newProduct = {
        name: "40' Pickup",
        shortName: "40PU",
        price: 110.0,
        monthlyPrice: 0.0,
        rental: false,
        type: `${productTypes[0]._id.toHexString()}`
      };

      request(app)
        .patch(`/api/products/${products[0]._id.toHexString()}ss`)
        .set("Authorization", users[0].token)
        .send(newProduct)
        .expect(400)
        .expect(res => {
          expect(res.body.product).toBe("No product found.");
        })
        .end(done);
    });

    it("should not update a product with validation errors", done => {
      newProduct = {
        name: "",
        shortName: "",
        price: 110.0,
        monthlyPrice: 0.0,
        rental: "",
        type: ""
      };

      request(app)
        .patch(`/api/products/${products[0]._id.toHexString()}`)
        .set("Authorization", users[0].token)
        .send(newProduct)
        .expect(400)
        .expect(res => {
          // check to see if new product exists.
          expect(res.body.name).toBe("Name is required");
          expect(res.body.shortName).toBe("Short name is required");
          expect(res.body.rental).toBe("Must select a rental type");
          expect(res.body.type).toBe("Must select a product type");
        })
        .end(err => {
          if (err) {
            return done(err);
          }

          // Check to see if it was inserted into db properly.
          Product.findOne({ name: newProduct.name })
            .then(result => {
              expect(result).toBeFalsy();
              done();
            })
            .catch(e => done(e));
        });
    });
  });

  describe("DELETE /products/:id", () => {
    it("should delete a specific product", done => {
      request(app)
        .delete(`/api/products/${products[0]._id.toHexString()}`)
        .set("Authorization", users[0].token)
        .expect(200)
        .expect(res => {
          expect(res.body.name).toBe(products[0].name);
        })
        .end(err => {
          if (err) {
            return done(err);
          }

          Product.findById(products[0]._id.toHexString())
            .then(product => {
              expect(product).toBeFalsy();
              done();
            })
            .catch(e => done(e));
        });
    });

    it("should have 400 status and error message if id doesn't exist", done => {
      request(app)
        .delete(`/api/products/${products[0]._id.toHexString()}ss`)
        .set("Authorization", users[0].token)
        .expect(400)
        .expect(res => {
          expect(res.body.product).toBe("There was no product found");
        })
        .end(done);
    });
  });
});
