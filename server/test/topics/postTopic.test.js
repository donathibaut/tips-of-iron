/**
 * @file postTopic.test.js
 * @description Test Topic Creation
 * ! DELETE DATABASE TEST RESULTS BEFORE RUNNING A NEW ONE !
 */

const app = require("../../src/app");

const supertest = require("supertest");
const reqTest = supertest(app);

const assert = require("node:assert");
const { describe, it } = require("node:test");

// prettier-ignore
describe("POST topics", () => {

  // accessibility for all it()
  let testEmail;

  it("Create topic + Success 201",
    async () => {
      const emailDateNow = Date.now();
      testEmail = `createguy_${emailDateNow}@gmail.com`;

      const response = await reqTest
        .post("/api/topic")
        .send({ topicname: "CreateGuy", email: testEmail, password: "0000" })
        .expect(201);

      assert.strictEqual(response.body.success, true);
      assert.strictEqual(response.body.message, "Topic successfully created !");
    }
  );

  it("Error 400",
    async () => {
      const response = await reqTest.post("/api/topic").send({}).expect(400);

      assert.strictEqual(response.body.message, "Form Field Empty");
    }
  );

  it("Error 400 : Password === null",
    async () => {
      const response = await reqTest
        .post("/api/topic")
        .send({ topicname: "CreateGuy", email: testEmail, password: null })
        .expect(400);

      assert.strictEqual(response.body.message, "Form Field Empty");
    }
  );
});
