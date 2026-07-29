/**
 * @file postUser.test.js
 * @description Test User Creation
 */

const app = require("../../src/app");

const supertest = require("supertest");
const reqTest = supertest(app);

const assert = require("node:assert");
const { describe, it } = require("node:test");

// prettier-ignore
describe("POST users", () => {
  it("Create user + Success 201",
    async () => {
      const response = await reqTest
        .post("/api/user")
        .send({ username: "Billy", email: "billy@gmail.com", password: "0000" })
        .expect(201);

      assert.strictEqual(response.body.username, "Billy");
    });

  it("Error 400",
    async () => {
      const response = await reqTest.post("/api/user").send({}).expect(400);

      assert.strictEqual(response.body.message, "Form Field Empty");
    });

  it("Error 500",
    async () => {
      const response = await reqTest
        .post("/api/user")
        .send({ username: "Billy", email: "billy@gmail.com", password: null })
        .expect(500);

      assert.strictEqual(response.body.message, `Creation Failed : ${response.body.message.split(":")[1]} :(`);
    });
});
