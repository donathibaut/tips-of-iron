const app = require("../src/app");

const supertest = require("supertest");
const reqTest = supertest(app);

const assert = require("node:assert");
const { describe, it } = require("node:test");

// prettier-ignore
describe("DELETE users", () => {
  it("Delete user + Status 200",
    async () => {
      const response = await reqTest
        .delete("/user/1")
        .expect(200);

      assert.strictEqual(response.body.success, true);
    });

  it("Error 403",
    async () => {
      const response = await reqTest.delete("/user/1").expect(403);

      assert.strictEqual(response.body.message, "You don't have the right !");
    });
    
  it("Error 404",
    async () => {
      const response = await reqTest.delete("/user/1000").expect(404);

      assert.strictEqual(response.body.message, "User Not Found");
    });

  it("Error 500",
    async () => {
      const response = await reqTest.delete("/user/1").expect(500);

      assert.strictEqual(response.body.message, `Deletion Failed : ${response.body.message.split(":")[1]} :(`);
    });
});
