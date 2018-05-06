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
          expect(res.body.sizes.length).toBe(3);
        })
        .end(done);
    });
  });
});
