/**
 * @file deleteUser.test.js
 * @description Test User Deletion
 */

const app = require("../../src/app");

const supertest = require("supertest");
const reqTest = supertest(app);

const assert = require("node:assert");
const { describe, it } = require("node:test");

const jwt = require("jsonwebtoken");

// prettier-ignore
describe("DELETE users", () => {
  it("Delete user + Success 200",
    async () => {
      const tokenTest = jwt.sign(
        { id: 1, email: "billy@gmail.com", role: 0 },
        process.env.SECRET_KEY,
        { expiresIn: "1h" },
      );

      const response = await reqTest
        .delete("/api/user/1")
        .set("Authorization", `Bearer ${tokenTest}`)
        .expect(200);

      assert.strictEqual(response.body.success, true);
    });

  it("Error 403",
    async () => {
      const tokenTest = jwt.sign(
        { id: 1, email: "billy@gmail.com", role: 0 },
        process.env.SECRET_KEY,
        { expiresIn: "1h" },
      );

      const response = await reqTest
        .delete("/api/user/1")
        .set("Authorization", `Bearer ${tokenTest}`)
        .expect(403);

      assert.strictEqual(response.body.message.includes("You don't have the right !"), true);
    });
    
  it("Error 404",
    async () => {
      const tokenTest = jwt.sign(
        { id: 1, email: "billy@gmail.com", role: 0 },
        process.env.SECRET_KEY,
        { expiresIn: "1h" },
      );

      const response = await reqTest
        .delete("/api/user/1000")
        .set("Authorization", `Bearer ${tokenTest}`)
        .expect(404);

      assert.strictEqual(response.body.message, "User Not Found");
    });

  it("Error 500",
    async () => {
      const tokenTest = jwt.sign(
        { id: 1, email: "billy@gmail.com", role: 0 },
        process.env.SECRET_KEY,
        { expiresIn: "1h" },
      );

      const response = await reqTest
        .delete("/api/user/1")
        .set("Authorization", `Bearer ${tokenTest}`)
        .expect(500);

      assert.strictEqual(response.body.message.includes("Deletion Failed :"), true);
    });
});
