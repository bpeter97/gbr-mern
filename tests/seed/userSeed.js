const { ObjectID } = require("mongodb");
const bcrypt = require("bcryptjs");
const User = require("../../models/User");

const userOneID = new ObjectID();
const userTwoID = new ObjectID();
const userThreeID = new ObjectID();
const userFourID = new ObjectID();

var users = [
  {
    _id: userOneID,
    firstName: "Brian",
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
  },
  {
    _id: userTwoID,
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
    validated: false
  },
  {
    _id: userThreeID,
    firstName: "Taylor",
    lastName: "Hartley",
    middleInitial: "",
    suffix: "",
    username: "thartley",
    password: "thePassword",
    email: "new@test.com",
    phone: "5558881224",
    title: "Web Developer",
    type: "Admin",
    validated: true
  },
  {
    _id: userFourID,
    firstName: "Jesse",
    lastName: "Johnson",
    middleInitial: "",
    suffix: "",
    username: "jjohnson",
    password: "thePassword",
    email: "jjohnson@test.com",
    phone: "5598581234",
    title: "Driver",
    type: "Staff",
    validated: true
  }
];

const populateUsers = done => {
  User.deleteMany({})
    .then(() => {
      // generate the hash/salted password for the users.
      var userOne = new User(users[0]).save().then(user => {
        users[0].token = user.generateAuthToken();
      });
      var userTwo = new User(users[1]).save().then(user => {
        users[1].token = user.generateAuthToken();
      });
      var userThree = new User(users[2]).save();
      var userFour = new User(users[3]).save();

      return Promise.all([userOne, userTwo, userThree, userFour]);
    })
    .then(() => done())
    .catch(e => console.log(e));
};

module.exports = {
  populateUsers,
  users
};
