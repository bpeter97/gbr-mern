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

var newContainer = {
  gbrNumber: "",
  releaseNumber: "",
  size: containerSizes[1]._id,
  serialNumber: "123456727",
  hasShelves: false,
  isPainted: false,
  hasOnBoxNumbers: false,
  hasSigns: false,
  rentalResale: "Resale",
  isFlagged: false,
  flagReason: ""
};

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

    // End of delete
  });

  describe("GET /containers/", () => {
    it("should return an array of containers", done => {
      request(app)
        .get("/api/containers/")
        .expect(200)
        .expect(res => {
          expect(res.body.containers.length).toBe(3);
          // Check to see if each container has a size and stats.
          expect(res.body.containers[0].size).not.toBe(null);
          expect(res.body.containers[1].size).not.toBe(null);
          expect(res.body.containers[2].size).not.toBe(null);
          expect(res.body.containers[0].stats).not.toBe(null);
          expect(res.body.containers[1].stats).not.toBe(null);
          expect(res.body.containers[2].stats).not.toBe(null);
        })
        .end(done);
    });
  });

  describe("POST /containers/", () => {
    it("should create a new container", done => {
      request(app)
        .post("/api/containers/")
        .send(newContainer)
        // .expect(200)
        .expect(res => {
          expect(res.body.container).toBeTruthy();
          // Check to see if each container has a size and stats.
          expect(res.body.container.size).not.toBe(null);
          expect(res.body.container.stats).not.toBe(null);
        })
        .end(err => {
          if (err) {
            done(err);
          }

          Container.findOne({ serialNumber: "123456727" })
            .then(container => {
              expect(container).toBeTruthy();
              expect(container.size).not.toBe(null);
              expect(container.stats).not.toBe(null);
              done();
            })
            .catch(e => done(e));
        });
    });

    it("should not create a new container with validation errors", done => {
      newContainer.rentalResale = "";
      newContainer.hasOnBoxNumbers = 123;
      newContainer.hasShelves = 123;
      newContainer.hasSigns = 123;
      newContainer.isPainted = 123;

      request(app)
        .post("/api/containers/")
        .send(newContainer)
        // .expect(200)
        .expect(res => {
          expect(res.body.container).toBeFalsy();
          // Check to see if each container has a size and stats.
          expect(res.body.rentalResale).toBe("Select rental or resale");
          expect(res.body.hasShelves).toBe(
            "You must select whether the container has shelves or not"
          );
          expect(res.body.isPainted).toBe(
            "You must select whether the container is painted or not"
          );
          expect(res.body.hasOnBoxNumbers).toBe(
            "You must select whether the container has GBR numbers or not"
          );
          expect(res.body.hasSigns).toBe(
            "You must select whether the container has signs or not"
          );
        })
        .end(err => {
          if (err) {
            done(err);
          }

          Container.findOne({ serialNumber: "123456727" })
            .then(container => {
              expect(container).toBeFalsy();
              done();
            })
            .catch(e => done(e));
        });
    });
  });

  describe("GET /containers/:id", () => {
    it("should return a container", done => {
      request(app)
        .get(`/api/containers/${containers[0]._id}`)
        .expect(200)
        .expect(res => {
          expect(res.body.container).toBeTruthy();
          expect(res.body.container.serialNumber).toBe(
            containers[0].serialNumber
          );
        })
        .end(done);
    });

    it("should not return a container with invalid id", done => {
      request(app)
        .get(`/api/containers/${containers[0]._id}sss`)
        .expect(400)
        .expect(res => {
          expect(res.body.container).toBeTruthy();
          expect(res.body.container).toBe("There was no container found");
        })
        .end(done);
    });
  });

  describe("PATCH /containers/:id", () => {
    it("should return a container", done => {
      patchData = {
        gbrNumber: containers[1].gbrNumber,
        releaseNumber: containers[1].releaseNumber,
        size: containers[1].size.toHexString(),
        serialNumber: containers[1].serialNumber,
        hasShelves: true,
        isPainted: true,
        hasOnBoxNumbers: true,
        hasSigns: true,
        rentalResale: "Rental",
        isFlagged: true,
        flagReason: "Container is super damaged",
        stats: containers[1].stats.toHexString(),
        currentRentee: null,
        previousRentees:
          "5aefceb5fd938b204046c428,5aefceb5fd938b204046c429,5aefceb5fd938b204046c42a,5aefceb5fd938b204046c42b,5aefceb5fd938b204046c427",
        currentAddress: "1733 S. Casablanca St., Visalia, CA 93292"
      };

      request(app)
        .patch(`/api/containers/${containers[1]._id}`)
        .send(patchData)
        .expect(200)
        .expect(res => {
          expect(res.body.container).toBeTruthy();
          expect(res.body.container.hasOnBoxNumbers).toBe(
            patchData.hasOnBoxNumbers
          );
          expect(res.body.container.hasSigns).toBe(patchData.hasSigns);
          expect(res.body.container.hasShelves).toBe(patchData.hasShelves);
          expect(res.body.container.isPainted).toBe(patchData.isPainted);
          expect(res.body.container.isFlagged).toBe(patchData.isFlagged);
          expect(res.body.container.flagReason).toBe(patchData.flagReason);
          expect(res.body.container.stats.currentAddress).toBe(
            patchData.currentAddress
          );
          expect(res.body.container.stats.currentRentee).toBe(null);
        })
        .end(done);
    });
  });

  // End of describe("CONTAINERS").
});
