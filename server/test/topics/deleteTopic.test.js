/**
 * @file deleteTopic.test.js
 * @description Test Topic Deletion
 * ! DELETE DATABASE TEST RESULTS BEFORE RUNNING A NEW ONE !
 */

const app = require("../../src/app");

const supertest = require("supertest");
const reqTest = supertest(app);

const assert = require("node:assert");
const { describe, it, before } = require("node:test");

const jwt = require("jsonwebtoken");

// prettier-ignore
describe("DELETE topics", () => {
  let topicID;
  let tokenTest;
  let wrongToken;

  // accessibility for all it()
  let testEmail;
  
  before(async () => {

    // Date.now() -> unique topic for any test run (fix test errors)
    const emailDateNow = Date.now();
    testEmail = `deleteguy_${emailDateNow}@gmail.com`;

    const res = await reqTest
      .post("/api/topic")
      .send({ topicname: "DeleteGuy", email: testEmail, password: "password" });
    
    const testTopic = res.body.result; 
    topicID = testTopic?.id_topic || testTopic?.id;

    tokenTest = jwt.sign(
      { id_topic: topicID, email: testEmail, role: 0 },
      process.env.SECRET_KEY,
      { expiresIn: "1h" },
    );

    wrongToken = jwt.sign(
      { id_topic: 999, email: testEmail, role: 999 },
      process.env.SECRET_KEY,
      { expiresIn: "1h" },
    );
  });

  it("Error 403",
    async () => {

      const response = await reqTest
        .delete(`/api/topic/${topicID}`)
        .set("Authorization", `Bearer ${wrongToken}`)
        .expect(403);

      assert.strictEqual(response.body.message.includes("You don't have the right !"), true);
    }
  );
    
  it("Error 404",
    async () => {

      const response = await reqTest
        .delete("/api/topic/1000")
        .set("Authorization", `Bearer ${tokenTest}`)
        .expect(404);

      assert.strictEqual(response.body.success, false);
    }
  );

  it("Delete topic + Success 200",
    async () => {

      const response = await reqTest
        .delete(`/api/topic/${topicID}`)
        .set("Authorization", `Bearer ${tokenTest}`)
        .expect(200);

      assert.strictEqual(response.body.success, true);
    }
  );
});
