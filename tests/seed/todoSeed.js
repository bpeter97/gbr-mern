const { ObjectID } = require("mongodb");
const bcrypt = require("bcryptjs");
const { users } = require("../../tests/seed/userSeed");
const Todo = require("./../../models/Todo");

const todoOneID = new ObjectID();
const todoTwoID = new ObjectID();
const todoThreeID = new ObjectID();

const todos = [
  {
    _id: todoOneID,
    desc: "Finish todo tests",
    completed: false,
    completedAt: null,
    creator: users[1]._id
  },
  {
    _id: todoTwoID,
    desc: "Begin working on quotes",
    completed: false,
    completedAt: null,
    creator: users[0]._id
  },
  {
    _id: todoThreeID,
    desc: "Create tests for quotes",
    completed: false,
    completedAt: null,
    creator: users[0]._id
  }
];

const populateTodos = done => {
  Todo.deleteMany({})
    .then(() => {
      // generate the hash/salted password for the users.
      var todoOne = new Todo(todos[0]).save();
      var todoTwo = new Todo(todos[1]).save();
      var todoThree = new Todo(todos[2]).save();

      return Promise.all([todoOne, todoTwo, todoThree]);
    })
    .then(() => done())
    .catch(e => console.log(e));
};

module.exports = {
  populateTodos,
  todos
};
