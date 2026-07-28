const app = require("../src/app");

const supertest = require("supertest");
const reqTest = supertest(app);

const assert = require("node:assert");
const { describe, it } = require("node:test");

// prettier-ignore
describe("GET users", () => {
  it("Get user + Status 200",
    async () => {
      const response = await reqTest
        .get("/user/1")
        .expect(200);

      assert.strictEqual(response.body.success, true);
    });
    
  it("Error 404 => user === null",
    async () => {
      const response = await reqTest.get("/user/").expect(404);

      assert.strictEqual(response.body.message, "User Not Found");
    });

  it("Error 404",
    async () => {
      const response = await reqTest.get("/user/1000").expect(404);

      assert.strictEqual(response.body.message, "User Not Found");
    });

  it("Error 500",
    async () => {
      const response = await reqTest.get("/user/1").expect(500);

      assert.strictEqual(response.body.message.include("Request Failed"), true);
    });
});
