const expect = require("expect");
const request = require("supertest");

const { app } = require("./../../server");
const Customer = require("./../models/Customer");
const { populateCustomers, customers } = require("./seed/customerSeed");
const { populateUsers, users } = require("./seed/userSeed");

// call beforeEach() to run functions before each test.
beforeEach(populateUsers);
beforeEach(populateCustomers);

// New customer object used for the post test.
newCustomer = {
  name: "George Terrens",
  address1: "7389 Baller St",
  address2: "",
  city: "Visalia",
  zipcode: "93292",
  state: "CA",
  phone: "559-001-0019",
  ext: "123",
  fax: "559-001-0018",
  email: "kelmore@dox.com",
  rdp: "",
  notes: "",
  isFlagged: false,
  flagReason: "",
  lastViewed: null
};

// Bad customer object to test invalid inputs
badCustomer = {
  name: "",
  address1: "",
  address2: "",
  city: "",
  zipcode: "",
  state: "",
  phone: "",
  ext: "123",
  fax: "559-981-1258",
  email: "bademail.com",
  rdp: "",
  notes: "",
  isFlagged: "hello",
  flagReason: "",
  lastViewed: null
};

describe("CUSTOMERS", () => {
  describe("GET /customers", () => {
    it("should return an array of customers", done => {
      request(app)
        .get("/api/customers")
        .set("Authorization", users[0].token)
        .expect(200)
        .expect(res => {
          expect(res.body.customers.length).toBe(customers.length);
        })
        .end(done);
    });
  });

  describe("POST /customers", () => {
    it("should create a new customer and update last viewed", done => {
      request(app)
        .post("/api/customers")
        .set("Authorization", users[0].token)
        .send(newCustomer)
        .expect(200)
        .expect(res => {
          expect(res.body.customer.name).toBe(newCustomer.name);
          expect(res.body.customer.lastViewed).not.toBe(null);
        })
        .end(err => {
          if (err) {
            return done(err);
          }

          Customer.findOne({ name: newCustomer.name })
            .then(customer => {
              expect(customer).toBeTruthy();
              done();
            })
            .catch(e => done(e));
        });
    });
    it("should not create a new customer with validation errors", done => {
      request(app)
        .post("/api/customers")
        .set("Authorization", users[0].token)
        .send(badCustomer)
        .expect(400)
        .expect(res => {
          expect(res.body.name).toBe("Name is required");
          expect(res.body.address).toBe("Address is required");
          expect(res.body.city).toBe("City is required");
          expect(res.body.zipcode).toBe("Zipcode is required");
          expect(res.body.state).toBe("State is required");
          expect(res.body.phone).toBe("Phone is required");
          expect(res.body.email).toBe("Email is invalid");
          expect(res.body.isFlagged).toBe(
            "You must select whether the customer has a flag or not"
          );
        })
        .end(err => {
          if (err) {
            return done(err);
          }

          Customer.findOne({ name: newCustomer.name })
            .then(customer => {
              expect(customer).toBeFalsy();
              done();
            })
            .catch(e => done(e));
        });
    });
  });

  describe("GET /customers/:id", () => {
    it("should return a customer with updated last viewed property", done => {
      request(app)
        .get(`/api/customers/${customers[0]._id}`)
        .set("Authorization", users[0].token)
        .expect(200)
        .expect(res => {
          expect(res.body.customer.name).toBe(customers[0].name);
          expect(res.body.customer.lastViewed).not.toBe(null);
        })
        .end(done);
    });
    it("should not return user with invalid ID", done => {
      request(app)
        .get(`/api/customers/${customers[0]._id}ssss`)
        .set("Authorization", users[0].token)
        .expect(400)
        .expect(res => {
          expect(res.body.customer).toBe("There was no customer found");
        })
        .end(done);
    });
  });

  describe("PATCH /customers/:id", () => {
    it("should update a customer & return the customer", done => {
      request(app)
        .patch(`/api/customers/${customers[1]._id}`)
        .set("Authorization", users[0].token)
        .send({
          name: "Jacob Belmont",
          address1: "1234 Loopy St",
          address2: "",
          city: "Hanford",
          zipcode: "93230",
          state: "CA",
          phone: "559-444-4444",
          ext: "123",
          fax: "559-444-4448",
          email: "another@fake.com",
          rdp: "",
          notes: "Customer requires quote everytime before orders",
          isFlagged: false,
          flagReason: "",
          lastViewed: null
        })
        .expect(200)
        .expect(res => {
          expect(res.body.customer.name).toBe("Jacob Belmont");
          expect(res.body.customer.isFlagged).toBe(false);
          expect(res.body.customer.flagReason).toBe("");
        })
        .end(err => {
          if (err) {
            return done(err);
          }

          Customer.findById(customers[1]._id)
            .then(customer => {
              expect(customer).toBeTruthy();
              expect(customer.name).toBe("Jacob Belmont");
              expect(customer.isFlagged).toBe(false);
              expect(customer.flagReason).toBe("");
              done();
            })
            .catch(e => done(e));
        });
    });

    it("should not update the customer with validation errors", done => {
      request(app)
        .patch(`/api/customers/${customers[2]._id}`)
        .set("Authorization", users[0].token)
        .send({
          name: "",
          address1: "",
          address2: "",
          city: "",
          zipcode: "",
          state: "",
          phone: "",
          ext: "123",
          fax: "559-444-4448",
          email: "failemail.com",
          rdp: "",
          notes: "Customer requires quote everytime before orders",
          isFlagged: "messedup",
          flagReason: "Do not rent, patient hasn't paid bill.",
          lastViewed: null
        })
        .expect(400)
        .expect(res => {
          expect(res.body.name).toBe("Name is required");
          expect(res.body.address).toBe("Address is required");
          expect(res.body.city).toBe("City is required");
          expect(res.body.zipcode).toBe("Zipcode is required");
          expect(res.body.state).toBe("State is required");
          expect(res.body.phone).toBe("Phone is required");
          expect(res.body.email).toBe("Email is invalid");
          expect(res.body.isFlagged).toBe(
            "You must select whether the customer has a flag or not"
          );
        })
        .end(done);
    });

    it("should not update customer with incorrect ID.", done => {
      request(app)
        .patch(`/api/customers/${customers[0]._id}ssss`)
        .set("Authorization", users[0].token)
        .send({})
        .expect(400)
        .expect(res => {
          expect(res.body.customer).toBe("There was no customer found");
        })
        .end(done);
    });
  });

  describe("DELETE /customers/:id", () => {
    it("should delete a customer return the customers data", done => {
      request(app)
        .delete(`/api/customers/${customers[0]._id}`)
        .set("Authorization", users[0].token)
        .expect(200)
        .expect(res => {
          expect(res.body.customer.name).toBe(customers[0].name);
        })
        .end(err => {
          if (err) {
            return done(err);
          }

          Customer.findById(customers[0]._id)
            .then(customer => {
              expect(customer).toBeFalsy();
              done();
            })
            .catch(e => done(e));
        });
    });

    it("should not delete customer with incorrect ID.", done => {
      request(app)
        .delete(`/api/customers/${customers[0]._id}ssss`)
        .set("Authorization", users[0].token)
        .expect(400)
        .expect(res => {
          expect(res.body.customer).toBe("There was no customer found");
        })
        .end(err => {
          if (err) {
            return done(err);
          }

          Customer.findById(customers[0]._id)
            .then(customer => {
              expect(customer).toBeTruthy();
              done();
            })
            .catch(e => done(e));
        });
    });
  });
});
