const expect = require("expect");
const request = require("supertest");

const { app } = require("./../../server");
const User = require("./../models/User");
const { populateUsers, users } = require("./seed/userSeed");

// call beforeEach() to run functions before each test.
beforeEach(populateUsers);

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
  type: "Driver"
};

describe("DEFAULTS", () => {
  // Test the post /register route.
  describe("POST /register", () => {
    it("should register a new user", done => {
      request(app)
        .post("/api/register")
        .send(newUser)
        .expect(200)
        .expect(res => {
          // Check to see if body contains users information. If so,
          // then the user's information was passed back meaning it succeeded.
          expect(res.body.username).toBe(newUser.username);
          expect(res.body.password).not.toBe(newUser.password);
        })
        .end(err => {
          if (err) {
            return done(err);
          }
          // If no errors during registration, check to see if newUser was
          // stored in the database properly.
          User.findOne({ username: newUser.username })
            .then(user => {
              expect(user).toBeTruthy();
              expect(user.password).not.toBe(newUser.password);
              done();
            })
            .catch(e => done(e));
        });
    });

    it("should not register a new user with an invalid email", done => {
      newUser.email = "amessedupemail";

      request(app)
        .post("/api/register")
        .send(newUser)
        .expect(400)
        .expect(res => {
          // Check to see if body contains users information. If so,
          // then the user's information was passed back meaning it succeeded.
          expect(res.body.email).toBeTruthy();
        })
        .end(err => {
          if (err) {
            return done(err);
          }
          // If no errors during registration, check to see if newUser was
          // stored in the database properly.
          User.findOne({ username: newUser.username })
            .then(user => {
              expect(user).not.toBe();
              done();
            })
            .catch(e => done(e));
        });
    });

    it("should not register a new user with an already taken username", done => {
      newUser.email = "jboy@test.com";
      newUser.username = users[0].username;

      request(app)
        .post("/api/register")
        .send(newUser)
        .expect(400)
        .expect(res => {
          // Check to see if body contains users information. If so,
          // then the user's information was passed back meaning it succeeded.
          expect(res.body.username).toBeTruthy();
        })
        .end(err => {
          if (err) {
            return done(err);
          }
          // If no errors during registration, check to see if newUser was
          // stored in the database properly.
          User.findOne({ email: newUser.email })
            .then(user => {
              expect(user).not.toBe();
              done();
            })
            .catch(e => done(e));
        });
    });
  });
});
