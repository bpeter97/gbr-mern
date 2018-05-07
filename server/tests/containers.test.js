const { ObjectID } = require("mongodb");
const expect = require("expect");
const request = require("supertest");

const { app } = require("./../../server");
const Container = require("./../models/Container");
const ContainerSize = require("./../models/ContainerSize");
const ContainerStats = require("./../models/ContainerStats");
const {
  populateContainerSizes,
  populateContainerStats,
  populateContainers,
  containerSizes,
  containerStats,
  containers
} = require("./seed/containerSeed");

describe("CONTAINERS", () => {
  beforeEach(populateContainerSizes);
  beforeEach(populateContainerStats);
  beforeEach(populateContainers);

  describe("GET /containers/sizes", () => {
    it("should return an array of container sizes", done => {
      request(app)
        .get("/api/containers/sizes")
        .expect(200)
        .expect(res => {
          expect(res.body.containerSizes.length).toBe(3);
        })
        .end(done);
    });
  });

  describe("POST /containers/sizes", () => {
    it("should create a new container size", done => {
      request(app)
        .post("/api/containers/sizes")
        .send({ size: "20C" })
        .expect(200)
        .expect(res => {
          expect(res.body.containerSize).toBeTruthy();
          expect(res.body.containerSize.size).toBe("20C");
        })
        .end(err => {
          if (err) {
            return done(err);
          }

          ContainerSize.findOne({ size: "20C" })
            .then(size => {
              expect(size).toBeTruthy();
              done();
            })
            .catch(e => done(e));
        });
    });

    it("should not create a new container size with invalid input", done => {
      request(app)
        .post("/api/containers/sizes")
        .send({ size: "" })
        .expect(400)
        .expect(res => {
          expect(res.body.size).toBe("Size is required");
        })
        .end(err => {
          if (err) {
            return done(err);
          }

          ContainerSize.findOne({ size: "20C" })
            .then(size => {
              expect(size).toBeFalsy();
              done();
            })
            .catch(e => done(e));
        });
    });
  });

  describe("GET /containers/sizes/:id", () => {
    it("should return a specific container size", done => {
      request(app)
        .get(`/api/containers/sizes/${containerSizes[0]._id}`)
        .expect(200)
        .expect(res => {
          expect(res.body.containerSize._id).toBe(
            containerSizes[0]._id.toHexString()
          );
        })
        .end(done);
    });

    it("should not return a specific container size with invalid :id", done => {
      request(app)
        .get(`/api/containers/sizes/${containerSizes[0]._id}sss`)
        .expect(400)
        .expect(res => {
          expect(res.body.size).toBe("There was no size found");
        })
        .end(done);
    });
  });

  describe("PATCH /containers/sizes/:id", () => {
    it("should patch a container size successfully", done => {
      request(app)
        .patch(`/api/containers/sizes/${containerSizes[0]._id}`)
        .send({ size: "10" })
        .expect(200)
        .expect(res => {
          expect(res.body.containerSize).toBeTruthy();
          expect(res.body.containerSize.size).toBe("10");
        })
        .end(err => {
          if (err) {
            return done(err);
          }

          ContainerSize.findById(containerSizes[0]._id)
            .then(containerSize => {
              expect(containerSize).toBeTruthy();
              expect(containerSize.size).toBe("10");
              done();
            })
            .catch(e => done(e));
        });
    });

    it("should not patch a container size with errors", done => {
      request(app)
        .patch(`/api/containers/sizes/${containerSizes[0]._id}`)
        .send({ size: "" })
        .expect(400)
        .expect(res => {
          expect(res.body.size).toBeTruthy();
          expect(res.body.size).toBe("Size is required");
        })
        .end(err => {
          if (err) {
            return done(err);
          }

          ContainerSize.findById(containerSizes[0]._id)
            .then(containerSize => {
              expect(containerSize).toBeTruthy();
              expect(containerSize.size).toBe("20");
              done();
            })
            .catch(e => done(e));
        });
    });

    it("should not patch a container size with invalid ID", done => {
      request(app)
        .patch(`/api/containers/sizes/${containerSizes[0]._id}ss`)
        .send({ size: "" })
        .expect(400)
        .expect(res => {
          expect(res.body.size).toBeTruthy();
          expect(res.body.size).toBe("There was no size found");
        })
        .end(done);
    });

    it("should not patch a container size with size that exists", done => {
      request(app)
        .patch(`/api/containers/sizes/${containerSizes[0]._id}`)
        .send({ size: "40" })
        .expect(400)
        .expect(res => {
          expect(res.body.size).toBeTruthy();
          expect(res.body.size).toBe("That size already exists");
        })
        .end(done);
    });

    // End of PATCH
  });

  describe("DELETE /containers/sizes/:id", () => {
    it("should delete the container size", done => {
      request(app)
        .delete(`/api/containers/sizes/${containerSizes[0]._id}`)
        .expect(200)
        .expect(res => {
          expect(res.body.containerSize).toBeTruthy();
          expect(res.body.containerSize.size).toBe(containerSizes[0].size);
        })
        .end(err => {
          if (err) {
            done(err);
          }

          ContainerSize.findById(containerSizes[0]._id)
            .then(containerSize => {
              expect(containerSize).toBeFalsy();
              done();
            })
            .catch(e => done(e));
        });
    });

    it("should not delete the container size with invalid id", done => {
      request(app)
        .delete(`/api/containers/sizes/${containerSizes[0]._id}ssss`)
        .expect(400)
        .expect(res => {
          expect(res.body.size).toBeTruthy();
          expect(res.body.size).toBe("There was no size found");
        })
        .end(err => {
          if (err) {
            done(err);
          }

          ContainerSize.findById(containerSizes[0]._id)
            .then(containerSize => {
              expect(containerSize).toBeTruthy();
              done();
            })
            .catch(e => done(e));
        });
    });
  });

  // End of describe("CONTAINERS").
});
