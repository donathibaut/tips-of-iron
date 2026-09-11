/**
 * @file deleteUser.test.js
 * @description Test User Deletion
 */

const app = require("../../src/app");

const supertest = require("supertest");
const reqTest = supertest(app);

const assert = require("node:assert");
const { describe, it, before } = require("node:test");

const jwt = require("jsonwebtoken");

// prettier-ignore
describe("DELETE users", () => {
  let userID;
  let tokenTest;
  const password = "aA1$aaaa";
  let wrongToken;

  // accessibility for all it()
  let testEmail;
  
  before(async () => {

    // Date.now() -> unique user for any test run (fix test errors)
    const emailDateNow = Date.now();
    testEmail = `deleteguy_${emailDateNow}@gmail.com`;

    const res = await reqTest
      .post("/api/user")
      .send({ username: "DeleteGuy", email: testEmail, password: password });
    
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

    it("Error 401 -> Wrong Password",
    async () => {

      const response = await reqTest
        .delete("/api/user/1000")
        .set("Authorization", `Bearer ${tokenTest}`)
        .send({password: "wrong"})
        .expect(404);

      assert.strictEqual(response.body.success, false);
    }
  );

  it("Error 403 ->  ID not matching",
    async () => {

      const response = await reqTest
        .delete(`/api/user/${userID}`)
        .set("Authorization", `Bearer ${wrongToken}`)
        .send({ password: password })
        .expect(403);

      assert.strictEqual(response.body.message.includes("You don't have the right!"), true);
    }
  );
    
  it("Error 404 -> User not found",
    async () => {

      const response = await reqTest
        .delete("/api/user/1000")
        .set("Authorization", `Bearer ${tokenTest}`)
        .send({ password: password })
        .expect(404);

      assert.strictEqual(response.body.success, false);
    }
  );

  it("Delete user + Success 200",
    async () => {

      const response = await reqTest
        .delete(`/api/user/${userID}`)
        .set("Authorization", `Bearer ${tokenTest}`)
        .send({ password: password })
        .expect(200);

      assert.strictEqual(response.body.success, true);
    }
  );
});
