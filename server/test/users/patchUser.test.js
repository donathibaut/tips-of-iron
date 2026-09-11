/**
 * @file patchUser.test.js
 * @description Test User Update
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
  const password = "aA1$aaaa";
  let wrongToken;

  // accessibility for all it()
  let testEmail;
  
  before(async () => {

    // Date.now() -> unique user for any test run (fix test errors)
    const emailDateNow = Date.now();
    testEmail = `updateguy_${emailDateNow}@gmail.com`;

    const res = await reqTest
      .post("/api/user")
      .send({ username: "UpdateGuy", email: testEmail, password: password });
    
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

  it("Error 400 -> Form Field Empty",
    async () => {

      const response = await reqTest
        .patch(`/api/user/${userID}`)
        .set("Authorization", `Bearer ${tokenTest}`)
        .send({})
        .expect(400);

      assert.strictEqual(response.body.message, "Form Field Empty");
    }
  );

  it("Error 400 -> Password without special characters",
    async () => {

      const response = await reqTest
        .patch(`/api/user/${userID}`)
        .set("Authorization", `Bearer ${tokenTest}`)
        .send({ password: password, newPassword: "cC2hfhhfhffhfh" })
        .expect(400);

      assert.strictEqual(response.body.message, "Password is too short or Password format is incorrect");
    }
  );

  it("Error 403",
    async () => {

      const response = await reqTest
        .patch(`/api/user/${userID}`)
        .set("Authorization", `Bearer ${wrongToken}`)
        .expect(403);

      assert.strictEqual(response.body.message.includes("You don't have the right!"), true);
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

  it("Patch user username + Success 200",
    async () => {

      const response = await reqTest
        .patch(`/api/user/${userID}`)
        .set("Authorization", `Bearer ${tokenTest}`)
        .send({ username: "Billy"})
        .expect(200);

      assert.strictEqual(response.body.success, true);
    }
    
  );

  it("Patch user email + Success 200",
    async () => {

      const response = await reqTest
        .patch(`/api/user/${userID}`)
        .set("Authorization", `Bearer ${tokenTest}`)
        .send({ email: `updated_${testEmail}`})
        .expect(200);

      assert.strictEqual(response.body.success, true);
    }
  );

  it("Patch user password + Success 200",
    async () => {

      const response = await reqTest
        .patch(`/api/user/${userID}`)
        .set("Authorization", `Bearer ${tokenTest}`)
        .send({ password: password, newPassword: "cC2@hfhhfhffhfh" })
        .expect(200);

      assert.strictEqual(response.body.success, true);
    }
  );
});
