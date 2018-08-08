const expect = require("expect");
const request = require("supertest");

const { app } = require("./../../server");
const User = require("./../models/User");

const { populateUsers, users } = require("./seed/userSeed");

describe("ORDERS", () => {
	beforeEach(populateUsers);

	describe("GET /orders", () => {
		it("should return all orders that are not hidden");
		it("should not return orders if the user is not logged in");
	});

	describe("POST /orders", () => {
		it("should create an order and return it");
		it("should not create an order with validation errors");
		it("should not create an order if user is not logged in");
	});

	describe("GET /orders/customer/:id", () => {
		// May want to change this to not depend on the orders being hidden.
		it("should return all of a customer's orders that are not hidden");
		it("should not return orders if user is not logged in");
		it("should not return orders if supplied an invalid ID");
	});

	describe("GET /orders/user/:id", () => {
		// May want to change this to not depend on the orders being hidden.
		it("should return all of a user's created orders that are not hidden");
		it("should not return orders if user is not logged in");
		it("should not return orders if supplied an invalid ID");
	});

	describe("GET /orders/:id", () => {
		it("should return an order with the ID matching the provided ID");
		it("should not return an order if not logged in");
		it("should not return an order if supplied an invalid ID");
	});

	describe("PATCH /orders/:id", () => {
		it("should update and return an order");
		it("should not update an order if not logged in");
		it("should not update an order with improper ID");
		it("should not update an order with validation errors");
	});

	describe("DELETE /orders/:id", () => {
		it("should delete an order");
		it("should not delete an order if not logged in");
		it("should not delete an order with an invalid ID");
	});
});
