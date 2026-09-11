/**
 * @file auth.test.js
 * @description Test Login & Token Creation
 */

const app = require("../../src/app");

const supertest = require("supertest");
const reqTest = supertest(app);

const assert = require("node:assert");
const { describe, it, before } = require("node:test");

// prettier-ignore
describe("Log in & Create Token", () => {

    // accessibility for all it()
    let testEmail;
    const password = "aA1$aaaa";

    before(async () => {
        const emailDateNow = Date.now();
        testEmail = `loginguy_${emailDateNow}@gmail.com`;

            await reqTest
                .post("/api/user")
                .send({ username: "LoginGuy", email: testEmail, password: password });
        }
    );

    it("Error 401 : Email or Password -> Incorrect", async () => {

        const response = await reqTest
        .post("/api/login")
        .send({
            email: testEmail,
            password: "222"
        })
        .expect(401);

        assert.strictEqual(response.body.success, false);
    });

    it("Return token + Success 200", async () => {
        const response = await reqTest
            .post("/api/login")
            .send({
                email: testEmail,
                password: password
            })
            .expect(200);

        assert.strictEqual(response.body.success, true);
        assert.strictEqual(typeof response.body.token, "string");
        assert.strictEqual(response.body.message, "You are connected!");
    });
});
