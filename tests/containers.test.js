const { ObjectID } = require("mongodb");
const expect = require("expect");
const request = require("supertest");

const { app } = require("./../server");
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
const { populateUsers, users } = require("./seed/userSeed");

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
  flagReason: "",
  deliveries: []
};

var newContainerSize = { size: "20C" };

describe("CONTAINERS", () => {
  before(populateUsers);
  beforeEach(populateContainerSizes);
  beforeEach(populateContainerStats);
  beforeEach(populateContainers);

  describe("GET /containers/sizes", () => {
    it("should return an array of container sizes", done => {
      request(app)
        .get("/api/containers/sizes")
        .set("Authorization", users[0].token)
        .set("Authorization", users[0].token)
        .expect(200)
        .expect(res => {
          expect(res.body.length).toBe(3);
        })
        .end(done);
    });
  });

  describe("POST /containers/sizes", () => {
    it("should create a new container size", done => {
      request(app)
        .post("/api/containers/sizes")
        .set("Authorization", users[0].token)
        .send(newContainerSize)
        .expect(200)
        .expect(res => {
          expect(res.body.size).toBe("20C");
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
        .set("Authorization", users[0].token)
        .send({ size: "" })
        .expect(400)
        .expect(res => {
          expect(res.body.size).toBe("Size is required");
        })
        .end(err => {
          if (err) return done(err);

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
        .set("Authorization", users[0].token)
        .expect(200)
        .expect(res => {
          expect(res.body._id).toBe(containerSizes[0]._id.toHexString());
        })
        .end(done);
    });

    it("should not return a specific container size with invalid :id", done => {
      request(app)
        .get(`/api/containers/sizes/${containerSizes[0]._id}sss`)
        .set("Authorization", users[0].token)
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
        .set("Authorization", users[0].token)
        .send({ size: "10" })
        .expect(200)
        .expect(res => {
          expect(res.body.size).toBe("10");
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
        .set("Authorization", users[0].token)
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
        .set("Authorization", users[0].token)
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
        .set("Authorization", users[0].token)
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
        .set("Authorization", users[0].token)
        .expect(200)
        .expect(res => {
          expect(res.body.size).toBe(containerSizes[0].size);
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
        .set("Authorization", users[0].token)
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
        .get("/api/containers")
        .set("Authorization", users[0].token)
        .expect(200)
        .expect(res => {
          expect(res.body.length).toBe(3);
          // Check to see if each container has a size and stats.
          expect(res.body[0].size).not.toBe(null);
          expect(res.body[1].size).not.toBe(null);
          expect(res.body[2].size).not.toBe(null);
          expect(res.body[0].stats).not.toBe(null);
          expect(res.body[1].stats).not.toBe(null);
          expect(res.body[2].stats).not.toBe(null);
        })
        .end(done);
    });
  });

  describe("POST /containers/", () => {
    it("should create a new container", done => {
      request(app)
        .post("/api/containers")
        .set("Authorization", users[0].token)
        .send(newContainer)
        // .expect(200)
        .expect(res => {
          // Check to see if each container has a size and stats.
          expect(res.body.size).not.toBe(null);
          expect(res.body.stats).not.toBe(null);
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
        .post("/api/containers")
        .set("Authorization", users[0].token)
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
        .set("Authorization", users[0].token)
        .expect(200)
        .expect(res => {
          expect(res.body.serialNumber).toBe(containers[0].serialNumber);
        })
        .end(done);
    });

    it("should not return a container with invalid id", done => {
      request(app)
        .get(`/api/containers/${containers[0]._id}sss`)
        .set("Authorization", users[0].token)
        .expect(400)
        .expect(res => {
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
        size: {
          _id: containers[1].size.toHexString(),
          size: "40"
        },
        serialNumber: containers[1].serialNumber,
        hasShelves: true,
        isPainted: true,
        hasOnBoxNumbers: true,
        hasSigns: true,
        rentalResale: "Rental",
        isFlagged: true,
        flagReason: "Container is super damaged",
        stats: {
          _id: containers[1].stats.toHexString(),
          currentRentee: null,
          previousRentees:
            "5aefceb5fd938b204046c428,5aefceb5fd938b204046c429,5aefceb5fd938b204046c42a,5aefceb5fd938b204046c42b,5aefceb5fd938b204046c427",
          currentAddress: "1733 S. Casablanca St., Visalia, CA 93292",
          currentlyRented: false
        }
      };

      request(app)
        .patch(`/api/containers/${containers[1]._id}`)
        .set("Authorization", users[0].token)
        .send(patchData)
        .expect(200)
        .expect(res => {
          expect(res.body.hasOnBoxNumbers).toBe(patchData.hasOnBoxNumbers);
          expect(res.body.hasSigns).toBe(patchData.hasSigns);
          expect(res.body.hasShelves).toBe(patchData.hasShelves);
          expect(res.body.isPainted).toBe(patchData.isPainted);
          expect(res.body.isFlagged).toBe(patchData.isFlagged);
          expect(res.body.flagReason).toBe(patchData.flagReason);
          // Need to update stats object when patching a container!
          expect(res.body.stats.currentAddress).toBe(
            res.body.stats.currentAddress
          );
          expect(res.body.stats.currentRentee).toBe(null);
        })
        .end(done);
    });

    it("should not patch a container with invalid fields", done => {
      patchData = {
        gbrNumber: containers[1].gbrNumber,
        releaseNumber: containers[1].releaseNumber,
        size: {},
        serialNumber: containers[1].serialNumber,
        hasShelves: "true",
        isPainted: true,
        hasOnBoxNumbers: true,
        hasSigns: true,
        rentalResale: "",
        isFlagged: true,
        flagReason: "Container is super damaged",
        stats: {
          _id: containers[1].stats.toHexString(),
          currentRentee: null,
          previousRentees:
            "5aefceb5fd938b204046c428,5aefceb5fd938b204046c429,5aefceb5fd938b204046c42a,5aefceb5fd938b204046c42b,5aefceb5fd938b204046c427",
          currentAddress: "",
          currentlyRented: ""
        }
      };

      request(app)
        .patch(`/api/containers/${containers[1]._id}`)
        .set("Authorization", users[0].token)
        .send(patchData)
        .expect(400)
        .expect(res => {
          expect(res.body.container).toBeFalsy();
          expect(res.body.size).toBe("Size is required");
          expect(res.body.currentlyRented).toBe(
            "You must select whether the container is currently rented"
          );
          expect(res.body.currentAddress).toBe("Current address is required");
          expect(res.body.rentalResale).toBe("Select rental or resale");
        })
        .end(done);
    });
  });

  describe("DELETE /containers/:id", () => {
    it("should delete a container", done => {
      request(app)
        .delete(`/api/containers/${containers[1]._id}`)
        .set("Authorization", users[0].token)
        .expect(200)
        .expect(res => {
          expect(res.body._id).toBe(containers[1]._id.toHexString());
        })
        .end(err => {
          if (err) {
            return done(err);
          }

          Container.findById(containers[1]._id)
            .then(container => {
              expect(container).toBeFalsy();
              done();
            })
            .catch(e => done(e));
        });
    });
    it("should not delete a container with invalid ID", done => {
      request(app)
        .delete(`/api/containers/${containers[1]._id}sss`)
        .set("Authorization", users[0].token)
        .expect(400)
        .expect(res => {
          expect(res.body.container).toBe("There was no container found");
        })
        .end(done);
    });
  });

  // End of describe("CONTAINERS").
});
