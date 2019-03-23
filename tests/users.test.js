const expect = require("expect");
const request = require("supertest");

const { app } = require("./../server");
const User = require("./../models/User");
const { populateUsers, users } = require("./seed/userSeed");

// New user object used for the register test.
var newUser = {
  firstName: "Johnny",
  lastName: "Boy",
  middleInitial: "",
  suffix: "",
  username: "jboy",
  password: "thePassword",
  email: "jboy@test.com",
  phone: "5559992222",
  title: "Driver",
  type: "Driver",
  validated: false
};

describe("USERS", () => {
  // call beforeEach() to run functions before each test.
  beforeEach(populateUsers);
  describe("GET /users", () => {
    it("should return an array of users", done => {
      request(app)
        .get("/api/users")
        .set("Authorization", users[0].token)
        .expect(200)
        .expect(res => {
          expect(res.body.length).toBe(users.length);
        })
        .end(done);
    });
  });

  describe("POST /users", () => {
    it("should create a new user", done => {
      request(app)
        .post("/api/users")
        .set("Authorization", users[0].token)
        .send(newUser)
        .expect(200)
        .expect(res => {
          expect(res.body.username).toBe(newUser.username);
        })
        .end(err => {
          if (err) {
            return done(err);
          }

          User.findOne({ username: newUser.username })
            .then(user => {
              expect(user).toBeTruthy();
              expect(user.firstName).toBe(newUser.firstName);
              expect(user.password).not.toBe(newUser.password);
              done();
            })
            .catch(e => done(e));
        });
    });
    it("should not create a new user with validation errors", done => {
      newUser.email = "amessedupemail";
      newUser.phone = "(559) 999-1111";
      newUser.validated = "hello";
      request(app)
        .post("/api/users")
        .set("Authorization", users[0].token)
        .send(newUser)
        .expect(400)
        .expect(res => {
          expect(res.body.email).toBe("Must enter a valid email");
          expect(res.body.phone).toBe(
            "Must contain 10 digits, no dashes or parenthesis. ex: 5591234567"
          );
          expect(res.body.validated).toBe(
            "You must select whether the user is validated"
          );
        })
        .end(err => {
          if (err) {
            return done(err);
          }

          User.findOne({ username: newUser.username })
            .then(user => {
              expect(user).toBeFalsy();
              done();
            })
            .catch(e => done(e));
        });
    });
  });

  describe("GET /users/:id", () => {
    it("should return a single user", done => {
      request(app)
        .get(`/api/users/${users[0]._id}`)
        .set("Authorization", users[0].token)
        .expect(200)
        .expect(res => {
          expect(res.body._id).toBe(users[0]._id.toHexString());
          expect(res.body.username).toBe(users[0].username);
        })
        .end(done);
    });
    it("should not return a user with invalid ID", done => {
      request(app)
        .get(`/api/users/${users[0]._id}ssss`)
        .set("Authorization", users[0].token)
        .expect(400)
        .expect(res => {
          expect(res.body.user).toBe("There was no user found");
          expect(res.body.username).not.toBe(users[0].username);
        })
        .end(done);
    });
  });

  describe("PATCH /users/:id", () => {
    it("should update and return a single user", done => {
      users[1].validated = true;
      request(app)
        .patch(`/api/users/${users[1]._id}`)
        .set("Authorization", users[0].token)
        .send(users[1])
        .expect(200)
        .expect(res => {
          expect(res.body.username).toBe(users[1].username);
          expect(res.body.validated).toBe(true);
        })
        .end(err => {
          if (err) {
            return done(err);
          }

          User.findById(users[1]._id.toHexString())
            .then(user => {
              expect(user.validated).toBe(true);
              done();
            })
            .catch(e => done(e));
        });
    });

    it("should not update and return a user with invalid ID", done => {
      request(app)
        .patch(`/api/users/${users[1]._id}ssss`)
        .set("Authorization", users[0].token)
        .send(users[1])
        .expect(400)
        .expect(res => {
          expect(res.body.auth).toBe("Invalid ID");
        })
        .end(done);
    });

    it("should not update and return a user with validation errors", done => {
      userData = {
        firstName: "Brian",
        lastName: "Peter",
        middleInitial: "L",
        suffix: "Sr",
        username: "blpsr",
        password: "thePassword",
        email: "gbr@test.com",
        phone: "5559991224",
        title: "Manager",
        type: "Staff",
        validated: "someWrongValidation"
      };
      request(app)
        .patch(`/api/users/${users[1]._id}`)
        .set("Authorization", users[0].token)
        .send(userData)
        .expect(400)
        .expect(res => {
          expect(res.body.validated).toBe(
            "You must select whether the user is validated"
          );
        })
        .end(err => {
          if (err) {
            return done(err);
          }

          User.findById(users[1]._id.toHexString())
            .then(user => {
              expect(user.validated).toBe(true);
              expect(user.firstName).toBe("Brian");
              done();
            })
            .catch(e => done(e));
        });
    });
  });

  describe("DELETE /users/:id", () => {
    it("should delete and return a single user", done => {
      request(app)
        .delete(`/api/users/${users[0]._id}`)
        .set("Authorization", users[0].token)
        .expect(200)
        .expect(res => {
          expect(res.body._id).toBe(users[0]._id.toHexString());
          expect(res.body.username).toBe(users[0].username);
        })
        .end(err => {
          if (err) {
            return done(err);
          }

          User.findById(users[0]._id.toHexString())
            .then(user => {
              expect(user).toBeFalsy();
              done();
            })
            .catch(e => done(e));
        });
    });
    it("should not delete and return a user with invalid ID", done => {
      request(app)
        .delete(`/api/users/${users[1]._id}sss`)
        .set("Authorization", users[0].token)
        .expect(400)
        .expect(res => {
          expect(res.body.user).toBe("There was no user found");
          expect(res.body.username).not.toBe(users[1].username);
        })
        .end(err => {
          if (err) {
            return done(err);
          }

          User.findById(users[1]._id.toHexString())
            .then(user => {
              expect(user).toBeTruthy();
              expect(user.username).toBe(users[1].username);
              done();
            })
            .catch(e => done(e));
        });
    });
  });
});
