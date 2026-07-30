/**
 * @file patchUser.test.js
 * @description Test User Update
 * ! DELETE DATABASE TEST RESULTS  BEFORE RUNNING A NEW ONE !
 */

const app = require("../../src/app");

const supertest = require("supertest");
const reqTest = supertest(app);

const assert = require("node:assert");
const { describe, it, before } = require("node:test");

const jwt = require("jsonwebtoken");

// prettier-ignore
describe("PATCH users", () => {
  let userID;
  let tokenTest;
  let wrongToken;

  // accessibility for all it()
  let testEmail;
  
  before(async () => {

    // Date.now() -> unique user for any test run (fix test errors)
    const emailDateNow = Date.now();
    testEmail = `updateguy_${emailDateNow}@gmail.com`;

    const res = await reqTest
      .post("/api/user")
      .send({ username: "UpdateGuy", email: testEmail, password: "password" });
    
    const testUser = res.body.result; 
    userID = testUser?.id_user || testUser?.id;

    tokenTest = jwt.sign(
      { id_user: userID, email: testEmail, role: 0 },
      process.env.SECRET_KEY,
      { expiresIn: "1h" },
    );

    wrongToken = jwt.sign(
      { id_user: 999, email: testEmail, role: 999 },
      process.env.SECRET_KEY,
      { expiresIn: "1h" },
    );
  });

  it("Error 400",
    async () => {

      const response = await reqTest
        .patch(`/api/user/${userID}`)
        .set("Authorization", `Bearer ${tokenTest}`)
        .send({})
        .expect(400);

      assert.strictEqual(response.body.message, "Form Field Empty");
    }
  );

  it("Error 403",
    async () => {

      const response = await reqTest
        .patch(`/api/user/${userID}`)
        .set("Authorization", `Bearer ${wrongToken}`)
        .expect(403);

      assert.strictEqual(response.body.message.includes("You don't have the right !"), true);
    }
  );
    
  it("Error 404",
    async () => {

      const response = await reqTest
        .patch("/api/user/1000")
        .set("Authorization", `Bearer ${tokenTest}`)
        .expect(404);

      assert.strictEqual(response.body.success, false);
    }
  );

  it("Patch user + Success 200",
    async () => {

      const response = await reqTest
        .patch(`/api/user/${userID}`)
        .set("Authorization", `Bearer ${tokenTest}`)
        .send({ username: "Billy", email: `updated_${testEmail}`, password: "newPassword" })
        .expect(200);

      assert.strictEqual(response.body.success, true);
    }
  );
});
