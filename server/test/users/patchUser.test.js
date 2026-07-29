/**
 * @file patchUser.test.js
 * @description Test User Update
 */

const app = require("../../src/app");

const supertest = require("supertest");
const reqTest = supertest(app);

const assert = require("node:assert");
const { describe, it } = require("node:test");

const jwt = require("jsonwebtoken");

// prettier-ignore
describe("PATCH users", () => {
  it("Patch user + Success 200",
    async () => {
      const tokenTest = jwt.sign(
        { id: 1, email: "billy@gmail.com", role: 0 },
        process.env.SECRET_KEY,
        { expiresIn: "1h" },
      );

      const response = await reqTest
        .patch("/api/user/1")
        .set("Authorization", `Bearer ${tokenTest}`)
        .send({ username: "Billy", email: "billy@hotmail.com", password: "newPassword" })
        .expect(200);

      assert.strictEqual(response.body.success, true);
    });

  it("Error 400",
    async () => {
      const tokenTest = jwt.sign(
        { id: 1, email: "billy@gmail.com", role: 0 },
        process.env.SECRET_KEY,
        { expiresIn: "1h" },
      );

      const response = await reqTest
        .patch("/api/user/1")
        .set("Authorization", `Bearer ${tokenTest}`)
        .send({})
        .expect(400);

      assert.strictEqual(response.body.message, "Form Field Empty");
    });

  it("Error 403",
    async () => {
      const tokenTest = jwt.sign(
        { id: 1, email: "billy@gmail.com", role: 0 },
        process.env.SECRET_KEY,
        { expiresIn: "1h" },
      );

      const response = await reqTest
        .patch("/api/user/1")
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
        .patch("/api/user/1000")
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
        .patch("/api/user/1")
        .set("Authorization", `Bearer ${tokenTest}`)
        .expect(500);

      assert.strictEqual(response.body.message.includes("Update Failed :"), true);
    });
});
