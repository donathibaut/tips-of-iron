/**
 * @file postUser.test.js
 * @description Test User Creation
 * ! DELETE DATABASE TEST RESULTS  BEFORE RUNNING A NEW ONE !
 */

const app = require("../../src/app");

const supertest = require("supertest");
const reqTest = supertest(app);

const assert = require("node:assert");
const { describe, it } = require("node:test");

// prettier-ignore
describe("POST users", () => {

  // accessibility for all it()
  let testEmail;

  it("Create user + Success 201",
    async () => {
      const emailDateNow = Date.now();
      testEmail = `createguy_${emailDateNow}@gmail.com`;

      const response = await reqTest
        .post("/api/user")
        .send({ username: "CreateGuy", email: testEmail, password: "0000" })
        .expect(201);

      assert.strictEqual(response.body.success, true);
      assert.strictEqual(response.body.message, "User successfully created !");
    }
  );

  it("Error 400",
    async () => {
      const response = await reqTest.post("/api/user").send({}).expect(400);

      assert.strictEqual(response.body.message, "Form Field Empty");
    }
  );

  it("Error 400 : Password === null",
    async () => {
      const response = await reqTest
        .post("/api/user")
        .send({ username: "CreateGuy", email: testEmail, password: null })
        .expect(400);

      assert.strictEqual(response.body.message, "Form Field Empty");
    }
  );
});
