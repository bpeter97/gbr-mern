const expect = require("expect");
const request = require("supertest");

const { app } = require("./../server");
const User = require("./../models/User");
const { populateUsers, users } = require("./seed/userSeed");

describe("DEFAULTS", () => {
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
    type: "Driver",
    validated: false
  };

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
          // Check if user was saved in DB.
          User.findOne({ username: newUser.username })
            .then(user => {
              expect(user).toBeTruthy();
              expect(user.password).not.toBe(newUser.password);
              done();
            })
            .catch(e => done(e));
        });
    });

    it("should not register a new user with validation errors", done => {
      // Set invalid properties to newUser.
      newUser.email = "amessedupemail";
      newUser.phone = "(559) 999-1111";

      request(app)
        .post("/api/register")
        .send(newUser)
        .expect(400)
        .expect(res => {
          // Check to see if validation errors are there.
          expect(res.body.email).toBe("Must enter a valid email.");
          expect(res.body.phone).toBe(
            "Must contain 10 digits, no dashes or parenthesis. ex: 5591234567"
          );
        })
        .end(err => {
          if (err) {
            return done(err);
          }
          // Check if user was saved in DB.
          User.findOne({ username: newUser.username })
            .then(user => {
              expect(user).toBeFalsy();
              done();
            })
            .catch(e => done(e));
        });
    });

    it("should not register a new user with an already taken username", done => {
      newUser.email = "jboy@test.com";
      newUser.phone = "5559992222";
      newUser.username = users[0].username;

      request(app)
        .post("/api/register")
        .send(newUser)
        .expect(400)
        .expect(res => {
          // Check to see if validation errors are there.
          expect(res.body.username).toBe("Username already exists.");
        })
        .end(err => {
          if (err) {
            return done(err);
          }
          // Check if user was saved in DB.
          User.findOne({ email: newUser.email })
            .then(user => {
              expect(user).toBeFalsy();
              done();
            })
            .catch(e => done(e));
        });
    });

    it("should not register a new user with an already used email", done => {
      newUser.email = users[0].email;
      newUser.phone = "5559992222";
      newUser.username = "jboy";

      request(app)
        .post("/api/register")
        .send(newUser)
        .expect(400)
        .expect(res => {
          // Check to see if validation errors are there.
          expect(res.body.email).toBe("Email already exists.");
        })
        .end(err => {
          if (err) {
            return done(err);
          }
          // If no errors during registration, check to see if newUser was
          // stored in the database properly.
          User.findOne({ username: newUser.username })
            .then(user => {
              expect(user).toBeFalsy();
              done();
            })
            .catch(e => done(e));
        });
    });
  });

  // Test the post /login route.
  describe("POST /login", () => {
    it("should log a user in and return a token", done => {
      request(app)
        .post("/api/login")
        .send({
          username: "blpj",
          password: "thePassword"
        })
        .expect(200)
        .expect(res => {
          // check to see if success & token has been created.
          expect(res.body.success).toBe(true);
          expect(res.body.token).toBeTruthy();
        })
        .end(done);
    });

    it("should not log user in with incorrect username and return error", done => {
      request(app)
        .post("/api/login")
        .send({
          username: "wrongusername",
          password: "thePassword"
        })
        .expect(401)
        .expect(res => {
          // check to see if success & token has been created.
          expect(res.body.success).toBeFalsy();
          expect(res.body.token).toBeFalsy();
        })
        .end(done);
    });

    it("should not log user in with incorrect password and return error", done => {
      request(app)
        .post("/api/login")
        .send({
          username: "blpj",
          password: "theWrongPassword"
        })
        .expect(401)
        .expect(res => {
          // check to see if success & token has been created.
          expect(res.body.success).toBeFalsy();
          expect(res.body.token).toBeFalsy();
        })
        .end(done);
    });

    it("should not log user in without being validated", done => {
      request(app)
        .post("/api/login")
        .send({
          username: "blpsr",
          password: "thePassword"
        })
        .expect(401)
        .expect(res => {
          // check to see if success & token has been created.
          expect(res.body.success).toBeFalsy();
          expect(res.body.token).toBeFalsy();
          expect(res.body.login).toBe("Your account is not validated yet");
        })
        .end(done);
    });
  });

  describe("GET /profile", () => {
    it("should return logged in users information", done => {
      request(app)
        .get("/api/profile")
        .set("Authorization", users[0].token)
        .expect(200)
        .expect(res => {
          expect(res.body._id).toBe(users[0]._id.toHexString());
          expect(res.body.username).toBe(users[0].username);
        })
        .end(done);
    });

    it("should not return user information if not logged in", done => {
      request(app)
        .get("/api/profile")
        .expect(401)
        .expect(res => {
          // check to see if success & token has been created.
          expect(res.body.username).toBeFalsy();
          expect(res.body.auth).toBe("Authorization failed");
        })
        .end(done);
    });
  });

  describe("PATCH /profile", () => {
    it("should update the logged in users information", done => {
      userData = {
        firstName: "somename",
        lastName: "Peter",
        middleInitial: "L",
        suffix: "Jr",
        username: "blpj",
        password: "thePassword",
        email: "test@test.com",
        phone: "5559991234",
        title: "Web Developer",
        type: "Admin",
        validated: true
      };

      request(app)
        .patch("/api/profile")
        .set("Authorization", users[0].token)
        .send(userData)
        .expect(200)
        .expect(res => {
          expect(res.body._id).toBe(users[0]._id.toHexString());
          expect(res.body.firstName).toBe("somename");
        })
        .end(done);
    });

    it("should not update user information if not logged in", done => {
      userData = {
        firstName: "newname",
        lastName: "Peter",
        middleInitial: "L",
        suffix: "Jr",
        username: "blpj",
        password: "thePassword",
        email: "test@test.com",
        phone: "5559991234",
        title: "Web Developer",
        type: "Admin",
        validated: true
      };

      request(app)
        .patch("/api/profile")
        .expect(401)
        .expect(res => {
          // check to see if success & token has been created.
          expect(res.body.firstName).toBeFalsy();
          expect(res.body.auth).toBe("Authorization failed");
        })
        .end(done);
    });

    it("should not update user information with validation errors", done => {
      userData = {
        firstName: "newname",
        lastName: "Peter",
        middleInitial: "L",
        suffix: "Jr",
        username: "blpj",
        password: "thePassword",
        email: "bademail",
        phone: "5559991234",
        title: "Web Developer",
        type: "Admin",
        validated: "badvalidatedvalue"
      };

      request(app)
        .patch("/api/profile")
        .set("Authorization", users[0].token)
        .send(userData)
        .expect(400)
        .expect(res => {
          // check to see if success & token has been created.
          expect(res.body.email).toBe("Must enter a valid email");
          expect(res.body.validated).toBe(
            "You must select whether the user is validated"
          );
        })
        .end(done);
    });
  });
});
