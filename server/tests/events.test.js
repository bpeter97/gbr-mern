const expect = require("expect");
const request = require("supertest");

const { app } = require("./../../server");
const CalendarEvent = require("./../models/CalendarEvent");
const { populateEvents, events } = require("./seed/eventSeed");
const { populateUsers, users } = require("./seed/userSeed");

// New event object used for the post test.
newEvent = {
  title: "Start testing",
  color: "#00F9EE",
  start: JSON.stringify(new Date()),
  end: JSON.stringify(new Date()),
  order: null
};

badEvent = {
  title: "ss",
  color: "",
  start: "",
  end: "",
  order: null
};

describe("EVENTS", () => {
  // call before to run functions once before all tests.
  before(populateUsers);
  // call beforeEach() to run functions before each test.
  beforeEach(populateEvents);
  describe("GET /events", () => {
    it("should return a list of events", done => {
      request(app)
        .get("/api/events")
        .set("Authorization", users[0].token)
        .expect(200)
        .expect(res => {
          expect(res.body.events).toBeTruthy();
          expect(res.body.events.length).toBe(events.length);
        })
        .end(done);
    });
  });
  describe("POST /events", () => {
    it("should create a new event", done => {
      request(app)
        .post("/api/events")
        .set("Authorization", users[0].token)
        .send(newEvent)
        .expect(200)
        .expect(res => {
          expect(res.body.event).toBeTruthy();
          expect(res.body.event.title).toBe(newEvent.title);
        })
        .end(err => {
          if (err) {
            return done(err);
          }

          CalendarEvent.findOne({ title: newEvent.title })
            .then(event => {
              expect(event).toBeTruthy();
              expect(event.title).toBe(newEvent.title);
              done();
            })
            .catch(e => done(e));
        });
    });
    it("should not create a new event with validation errors", done => {
      request(app)
        .post("/api/events")
        .set("Authorization", users[0].token)
        .send(badEvent)
        .expect(400)
        .expect(res => {
          expect(res.body.title).toBe("Title must be at least 3 characters");
          expect(res.body.color).toBe("Color is required");
          expect(res.body.start).toBe("Start is required");
          expect(res.body.end).toBe("End is required");
        })
        .end(err => {
          if (err) {
            return done(err);
          }

          CalendarEvent.findOne({ title: badEvent.title })
            .then(event => {
              expect(event).toBeFalsy();
              done();
            })
            .catch(e => done(e));
        });
    });
  });
  describe("GET /events/:id", () => {
    it("should return a single event", done => {
      request(app)
        .get(`/api/events/${events[0]._id.toHexString()}`)
        .set("Authorization", users[0].token)
        .expect(200)
        .expect(res => {
          expect(res.body.event).toBeTruthy();
          expect(res.body.event._id).toBe(events[0]._id.toHexString());
        })
        .end(done);
    });
    it("should not return a single event with invalid id", done => {
      request(app)
        .get(`/api/events/${events[0]._id.toHexString()}sssss`)
        .set("Authorization", users[0].token)
        .expect(400)
        .expect(res => {
          expect(res.body.event).toBeTruthy();
          expect(res.body.event).toBe("There was no event found");
        })
        .end(done);
    });
  });
  describe("PATCH /events/:id", () => {
    it("should update a single event with new information", done => {
      request(app)
        .patch(`/api/events/${events[0]._id.toHexString()}`)
        .set("Authorization", users[0].token)
        .send({
          title: "New title",
          color: events[0].color,
          start: events[0].start,
          end: events[0].end,
          order: events[0].order
        })
        .expect(200)
        .expect(res => {
          expect(res.body.event.title).toBe("New title");
        })
        .end(err => {
          if (err) {
            return done(err);
          }

          CalendarEvent.findById(events[0]._id.toHexString())
            .then(event => {
              expect(event.title).toBe("New title");
              done();
            })
            .catch(e => done(e));
        });
    });
    it("should not update a single event with validation errors", done => {
      request(app)
        .patch(`/api/events/${events[0]._id.toHexString()}`)
        .set("Authorization", users[0].token)
        .send({
          title: "",
          color: "",
          start: "",
          end: "",
          order: null
        })
        .expect(400)
        .expect(res => {
          expect(res.body.title).toBe("Title must be at least 3 characters");
          expect(res.body.color).toBe("Color is required");
          expect(res.body.start).toBe("Start is required");
          expect(res.body.end).toBe("End is required");
        })
        .end(err => {
          if (err) {
            return done(err);
          }

          CalendarEvent.findById(events[0]._id.toHexString())
            .then(event => {
              expect(event.title).toBe(events[0].title);
              done();
            })
            .catch(e => done(e));
        });
    });
    it("should not update a single event with invalid ID", done => {
      request(app)
        .patch(`/api/events/${events[0]._id.toHexString()}sssss`)
        .set("Authorization", users[0].token)
        .send(events[0])
        .expect(400)
        .expect(res => {
          expect(res.body.event).toBe("There was no event found");
        })
        .end(done);
    });
  });
  describe("DELETE /events/:id", () => {
    it("should delete a single event", done => {
      request(app)
        .delete(`/api/events/${events[1]._id.toHexString()}`)
        .set("Authorization", users[0].token)
        .expect(200)
        .expect(res => {
          expect(res.body.event).toBeTruthy();
          expect(res.body.event._id).toBe(events[1]._id.toHexString());
        })
        .end(err => {
          if (err) {
            return done(err);
          }

          CalendarEvent.findById(events[1]._id.toHexString())
            .then(event => {
              expect(event).toBeFalsy();
              done();
            })
            .catch(e => done(e));
        });
    });
    it("should not delete an event with invalid ID", done => {
      request(app)
        .delete(`/api/events/${events[1]._id.toHexString()}sss`)
        .set("Authorization", users[0].token)
        .expect(400)
        .expect(res => {
          expect(res.body.event).toBeTruthy();
          expect(res.body.event).toBe("There was no event found");
        })
        .end(done);
    });
  });
});
