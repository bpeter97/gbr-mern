const { ObjectID } = require("mongodb");
const bcrypt = require("bcryptjs");
const User = require("../../models/User");

const userOneID = new ObjectID();
const userTwoID = new ObjectID();
const userThreeID = new ObjectID();

const users = [
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
  }
];

const populateUsers = done => {
  User.remove({})
    .then(() => {
      // generate the hash/salted password for the users.
      bcrypt.genSalt(10, (err, salt) => {
        // Now hash the password with the salt.
        bcrypt.hash("thePassword", salt, (err, hash) => {
          if (err) throw err;
          // Assign the newly hashed password to the new User object
          users[0].password = hash;
          users[1].password = hash;
          users[2].password = hash;
        });
      });
      var userOne = new User(users[0]).save();
      var userTwo = new User(users[1]).save();
      var userThree = new User(users[2]).save();

      return Promise.all([userOne, userTwo, userThree]);
    })
    .then(() => done())
    .catch(e => console.log(e));
};

module.exports = {
  populateUsers,
  users
};
