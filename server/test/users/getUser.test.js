/**
 * @file getUser.test.js
 * @description Test User Read
 */

const app = require("../../src/app");

const supertest = require("supertest");
const reqTest = supertest(app);

const assert = require("node:assert");
const { describe, it } = require("node:test");

// prettier-ignore
describe("GET users", () => {
  it("Get user + Success 200",
    async () => {
      const response = await reqTest
        .get("/api/user/1")
        .expect(200);

      assert.strictEqual(response.body.success, true);
    });
    
  it("Error 404 => user === null",
    async () => {
      const response = await reqTest.get("/api/user/").expect(404);

      assert.strictEqual(response.body.message, "User Not Found");
    });

  it("Error 404",
    async () => {
      const response = await reqTest.get("/api/user/1000").expect(404);

      assert.strictEqual(response.body.message, "User Not Found");
    });

  it("Error 500",
    async () => {
      const response = await reqTest.get("/api/user/1").expect(500);

      assert.strictEqual(response.body.message.includes("Request Failed"), true);
    });
});
