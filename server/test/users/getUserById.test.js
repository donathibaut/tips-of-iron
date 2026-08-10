/**
 * @file getUserById.test.js
 * @description Test User Read
 * ! DELETE DATABASE TEST RESULTS  BEFORE RUNNING A NEW ONE !
 */

const app = require("../../src/app");

const supertest = require("supertest");
const reqTest = supertest(app);

const assert = require("node:assert");
const { describe, it, before } = require("node:test");

// prettier-ignore
describe("GET users", () => {
  let userID;

  // create user before GET request
  before(async () => {

    // Date.now() -> unique user for any test run (fix test errors)
    const emailDateNow = Date.now();
    const testEmail = `getguy_${emailDateNow}@gmail.com`;

    const res = await reqTest
      .post("/api/user")
      .send({ username: "GetGuy", email: testEmail, password: "password" });
    
    const testUser = res.body.result; 
    userID = testUser?.id_user || testUser?.id;
  });

  it("Get user + Success 200",
    async () => {
      const response = await reqTest
        .get(`/api/user/${userID}`)
        .expect(200);

      assert.strictEqual(response.body.success, true);
    }
  );

  it("Error 404",
    async () => {
      const response = await reqTest.get("/api/user/1000").expect(404);

      assert.strictEqual(response.body.success, false);
    }
  );
});
