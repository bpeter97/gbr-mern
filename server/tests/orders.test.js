const expect = require("expect");
const request = require("supertest");

const { app } = require("./../../server");
const User = require("./../models/User");

const { populateUsers, users } = require("./seed/userSeed");
const { populateCustomers, customers } = require("./seed/customerSeed");
const { populateProducts } = require("./seed/productSeed");
const {
  orders,
  populateRequestedProducts,
  populatePurchasePrices,
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
  beforeEach(populateOrders);

  var newOrder = {
    quote: null,
    customer: customers[1]._id.toHexString(),
    purchaseType: purchaseTypes[0]._id.toHexString(),
    startDate: new Date(),
    endDate: null,
    job: {
      name: "Walmart Construction",
      address: "1733 S. Casablanca St",
      city: "Visalia",
      zipcode: "93292"
    },
    priceBeforeTax: 190.0,
    salesTax: 7.2,
    totalPrice: 197.2,
    monthlyPrice: 100.0,
    taxRate: 0.08,
    deliveryTotal: 90.0,
    products: [
      {
        quantity: 1,
        product: {
          name: "20' Delivery",
          shortName: "20DEL",
          price: 90.0,
          rental: false,
          type: "delivery"
        }
      },
      {
        quantity: 1,
        product: {
          name: "20' Container",
          shortName: "20CON",
          price: 100.0,
          rental: false,
          type: "container"
        }
      }
    ],
    containers: [
      {
        container: containers[1]._id.toHexString()
      }
    ]
  };

  var updatedOrder = orders[0];
  updatedOrder.job.name = "Not a personal job";
  updatedOrder._id = orders[0]._id.toHexString();
  updatedOrder.purchaseType = orders[0].purchaseType.toHexString();
  updatedOrder.customer = orders[0].customer.toHexString();
  updatedOrder.purchasePrices = orders[0].purchasePrices.toHexString();
  updatedOrder.createdBy = orders[0].createdBy.toHexString();
  updatedOrder.products = [
    {
      quantity: 1,
      product: orders[0].products[0].product.toHexString()
    },
    {
      quantity: 1,
      product: orders[0].products[1].product.toHexString()
    }
  ];
  updatedOrder.containers[0].container = orders[0].containers[0].container.toHexString();

  describe("GET /orders", () => {
    it("should return all orders that are not hidden", done => {
      request(app)
        .get("/api/orders")
        .set("Authorization", users[0].token)
        .expect(200)
        .expect(res => {
          expect(res.body.orders.length).toBe(orders.length);
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

  describe("GET /orders/customer/:id", () => {
    it("should return all of a customer's orders", done => {
      request(app)
        .get(`/api/orders/customer/${customers[0]._id}`)
        .set("Authorization", users[0].token)
        .expect(200)
        .expect(res => {
          expect(res.body.orders[0].customer._id).toBe(orders[0].customer);
        })
        .end(done);
    });
    it("should not return orders if user is not logged in", done => {
      request(app)
        .get(`/api/orders/customer/${customers[0]._id}`)
        .expect(401)
        .expect(res => {
          expect(res.body.auth).toBe("Authorization failed");
        })
        .end(done);
    });
    it("should not return orders if supplied an invalid ID", done => {
      request(app)
        .get(`/api/orders/customer/${customers[0]._id}sssssss`)
        .set("Authorization", users[0].token)
        .expect(400)
        .expect(res => {
          expect(res.body.customer).toBe("There was no customer found");
        })
        .end(done);
    });
  });

  describe("GET /orders/user/:id", () => {
    it("should return all of a user's created orders", done => {
      request(app)
        .get(`/api/orders/user/${users[0]._id}`)
        .set("Authorization", users[0].token)
        .expect(200)
        .expect(res => {
          expect(res.body.orders[0].createdBy._id).toBe(orders[0].createdBy);
        })
        .end(done);
    });
    it("should not return orders if user is not logged in", done => {
      request(app)
        .get(`/api/orders/user/${users[0]._id}`)
        .expect(401)
        .expect(res => {
          expect(res.body.auth).toBe("Authorization failed");
        })
        .end(done);
    });
    it("should not return orders if supplied an invalid ID", done => {
      request(app)
        .get(`/api/orders/user/${users[0]._id}sssssss`)
        .set("Authorization", users[0].token)
        .expect(400)
        .expect(res => {
          expect(res.body.user).toBe("There was no user found");
        })
        .end(done);
    });
  });

  describe("POST /orders", () => {
    it("should create an order and return it", done => {
      request(app)
        .post("/api/orders")
        .send(newOrder)
        .set("Authorization", users[0].token)
        .expect(200)
        .expect(res => {
          expect(res.body.job.name).toBe("Walmart Construction");
        })
        .end(err => {
          if (err) {
            return done(err);
          }

          Order.findOne({
            job: {
              name: "Walmart Construction",
              address: "1733 S. Casablanca St",
              city: "Visalia",
              zipcode: "93292"
            }
          })
            .then(order => {
              expect(order).toBeTruthy();
              expect(order.job.name).toBe("Walmart Construction");
              done();
            })
            .catch(e => done(e));
        });
    });
    // it("should not create an order with validation errors", done => {
    //   orders.startDate = "Not a date";

    //   request(app)
    //     .post("/api/orders")
    //     .send(newOrder)
    //     .set("Authorization", users[0].token)
    //     .expect(400)
    //     .expect(res => {
    //       expect(res.body.startDate).toBe("Not a valid date");
    //     })
    //     .end(err => {
    //       if (err) {
    //         return done(err);
    //       }

    //       Order.findOne({
    //         startDate: "Not a date"
    //       })
    //         .then(order => {
    //           expect(order).toBeFalsy();
    //           done();
    //         })
    //         .catch(e => done(e));
    //     });
    // });
    it("should not create an order if user is not logged in", done => {
      request(app)
        .post("/api/orders")
        .send(newOrder)
        .expect(401)
        .expect(res => {
          expect(res.body.auth).toBe("Authorization failed");
        })
        .end(done);
    });
  });

  describe("GET /orders/:id", () => {
    it("should return an order with the ID matching the provided ID", done => {
      request(app)
        .get(`/api/orders/${orders[0]._id}`)
        .set("Authorization", users[0].token)
        .expect(200)
        .expect(res => {
          expect(res.body._id).toBe(orders[0]._id);
        })
        .end(done);
    });
    it("should not return an order if not logged in", done => {
      request(app)
        .get(`/api/orders/${orders[0]._id}`)
        .expect(401)
        .expect(res => {
          expect(res.body.auth).toBe("Authorization failed");
        })
        .end(done);
    });
    it("should not return an order if supplied an invalid ID", done => {
      request(app)
        .get(`/api/orders/${orders[0]._id}ssssssssss`)
        .set("Authorization", users[0].token)
        .expect(400)
        .expect(res => {
          expect(res.body.order).toBe("There was no order found");
        })
        .end(done);
    });
  });

  // describe("PATCH /orders/:id", () => {
  //   it("should update and return an order", done => {
  //     request(app)
  //       .patch(`/api/orders/${orders[0]._id}`)
  //       .send(updatedOrder)
  //       .set("Authorization", users[0].token)
  //       .expect(200)
  //       .expect(res => {
  //         expect(res.body._id).toBe(orders[0]._id);
  //       })
  //       .end(err => {
  //         if (err) {
  //           return done(err);
  //         }

  //         Order.findOne({
  //           job: {
  //             name: "Not a personal job",
  //             address: "1733 S. Casablanca St",
  //             city: "Visalia",
  //             zipcode: "93292"
  //           }
  //         })
  //           .then(order => {
  //             expect(order).toBeTruthy();
  //             done();
  //           })
  //           .catch(e => done(e));
  //       });
  //   });
  //   it("should not update an order if not logged in", done => {
  //     request(app)
  //       .patch(`/api/orders/${orders[0]._id}`)
  //       .send(updatedOrder)
  //       .expect(401)
  //       .expect(res => {
  //         expect(res.body.auth).toBe("Authorization failed");
  //       })
  //       .end(done);
  //   });
  //   it("should not update an order with improper ID", done => {
  //     request(app)
  //       .patch(`/api/orders/${orders[0]._id}ssssssss`)
  //       .send(updatedOrder)
  //       .expect(400)
  //       .expect(res => {
  //         expect(res.body.order).toBe("There was no order found");
  //       })
  //       .end(done);
  //   });
  //   it("should not update an order with validation errors", done => {
  //     // updatedOrder.startDate = "Not a real date";

  //     request(app)
  //       .patch(`/api/orders/${orders[0]._id}`)
  //       .send(updatedOrder)
  //       .set("Authorization", users[0].token)
  //       .expect(400)
  //       .expect(res => {
  //         expect(res.body.startDate).toBe("Not a valid date");
  //       })
  //       .end(err => {
  //         if (err) {
  //           return done(err);
  //         }

  //         Order.findOne({
  //           // Fix this to not be a date
  //           startDate: updatedOrder.startDate
  //         })
  //           .then(order => {
  //             expect(order).toBeFalsy();
  //             done();
  //           })
  //           .catch(e => done(e));
  //       });
  //   });
  // });

  describe("DELETE /orders/:id", () => {
    updatedOrder.startDate = new Date();
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
