const expect = require("expect");
const request = require("supertest");

const { app } = require("./../server");
const User = require("./../models/User");
const { populateUsers, users } = require("./seed/userSeed");
const { populateTodos, todos } = require("./seed/todoSeed");

describe("TODOS", () => {
  // call beforeEach() to run functions before each test.
  beforeEach(populateUsers);
  beforeEach(populateTodos);

  // New todo object
  var newTodo = {
    desc: "Create some todos"
  };

  describe("GET /todos", () => {
    it("should return a users todos", done => {
      request(app)
        .get("/api/todos")
        .set("Authorization", users[0].token)
        .expect(200)
        .expect(res => {
          expect(res.body.length).toBe(2);
        })
        .end(done);
    });

    it("should not return a users todos if not logged in", done => {
      request(app)
        .get("/api/todos")
        .expect(401)
        .expect(res => {
          expect(res.body.auth).toBe("Authorization failed");
        })
        .end(done);
    });
  });

  describe("POST /todos", () => {
    it("should create a new todo for the logged in user", done => {
      request(app)
        .post("/api/todos")
        .set("Authorization", users[1].token)
        .send({
          desc: "The newest todo",
          creator: users[1]._id
        })
        .expect(200)
        .expect(res => {
          expect(res.body.desc).toBe("The newest todo");
          expect(res.body.creator).toBe(users[1]._id.toHexString());
        })
        .end(done);
    });

    it("should not create a new todo for a user who is not logged in", done => {
      request(app)
        .post("/api/todos")
        .send({
          desc: "The newest todo",
          creator: users[1]._id
        })
        .expect(401)
        .expect(res => {
          expect(res.body.auth).toBe("Authorization failed");
        })
        .end(done);
    });

    it("should not create a new todo with missing description", done => {
      request(app)
        .post("/api/todos")
        .set("Authorization", users[1].token)
        .send({
          desc: "",
          creator: users[1]._id
        })
        .expect(400)
        .expect(res => {
          expect(res.body.desc).toBe("Todo description is required");
        })
        .end(done);
    });
  });

  describe("GET /todo/:id", () => {
    it("should return the users todo", done => {
      request(app)
        .get(`/api/todos/${todos[0]._id}`)
        .set("Authorization", users[1].token)
        .expect(200)
        .expect(res => {
          expect(res.body.desc).toBe(todos[0].desc);
          expect(res.body.creator._id).toBe(users[1]._id.toHexString());
        })
        .end(done);
    });
    it("should not return another users todo", done => {
      request(app)
        .get(`/api/todos/${todos[0]._id}`)
        .set("Authorization", users[0].token)
        .expect(401)
        .expect(res => {
          expect(res.body.desc).toBeFalsy();
          expect(res.body.todo).toBe("You cannot access this todo");
        })
        .end(done);
    });
  });

  describe("PATCH /todo/:id", () => {
    it("should update the users todo", done => {
      request(app)
        .patch(`/api/todos/${todos[0]._id}`)
        .set("Authorization", users[1].token)
        .send({
          desc: "a new description",
          creator: users[1]._id
        })
        .expect(200)
        .expect(res => {
          expect(res.body.desc).toBe("a new description");
        })
        .end(done);
    });
    it("should not update another users todo", done => {
      request(app)
        .patch(`/api/todos/${todos[0]._id}`)
        .set("Authorization", users[0].token)
        .send({
          desc: "a new description",
          creator: users[1]._id
        })
        .expect(401)
        .expect(res => {
          expect(res.body.desc).toBeFalsy();
          expect(res.body.todo).toBe("You cannot access this todo");
        })
        .end(done);
    });
    it("should not update user's todo with validation errors", done => {
      request(app)
        .patch(`/api/todos/${todos[0]._id}`)
        .set("Authorization", users[1].token)
        .send({
          desc: "",
          creator: users[1]._id
        })
        .expect(400)
        .expect(res => {
          expect(res.body.desc).toBe("Todo description is required");
        })
        .end(done);
    });
  });

  describe("DELETE /todo/:id", () => {
    it("should delete the users todo", done => {
      request(app)
        .delete(`/api/todos/${todos[0]._id}`)
        .set("Authorization", users[1].token)
        .expect(200)
        .expect(res => {
          expect(res.body.desc).toBe(todos[0].desc);
        })
        .end(done);
    });
    it("should not delete another users todo", done => {
      request(app)
        .delete(`/api/todos/${todos[0]._id}`)
        .set("Authorization", users[0].token)
        .expect(401)
        .expect(res => {
          expect(res.body.todo).toBe("You cannot access this todo");
        })
        .end(done);
    });
  });
});
