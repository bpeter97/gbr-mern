const { ObjectID } = require("mongodb");
const CalendarEvent = require("../../models/CalendarEvent");

const eventOneID = new ObjectID();
const eventTwoID = new ObjectID();
const eventThreeID = new ObjectID();

events = [
  {
    _id: eventOneID,
    title: "Delivery",
    color: "00A013",
    start: new Date(),
    end: new Date(),
    order: new ObjectID()
  },
  {
    _id: eventTwoID,
    title: "Pickup",
    color: "A00096",
    start: new Date(),
    end: new Date(),
    order: new ObjectID()
  },
  {
    _id: eventThreeID,
    title: "Meeting",
    color: "000FF9",
    start: new Date(),
    end: new Date(),
    order: new ObjectID()
  }
];

const populateEvents = done => {
  CalendarEvent.deleteMany({})
    .then(() => {
      var eventOne = new CalendarEvent(events[0]).save();
      var eventTwo = new CalendarEvent(events[1]).save();
      var eventThree = new CalendarEvent(events[2]).save();

      return Promise.all([eventOne, eventTwo, eventThree]);
    })
    .then(() => done())
    .catch(e => console.log(e));
};

module.exports = {
  populateEvents,
  events
};
