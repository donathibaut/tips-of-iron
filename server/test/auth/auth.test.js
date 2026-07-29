const app = require("../../src/app");

const supertest = require("supertest");
const reqTest = supertest(app);

const assert = require("node:assert");
const { describe, it } = require("node:test");

// prettier-ignore
describe("Create Token", () => {
    it("Return token + Success 200", async () => {
        const response = await reqTest
            .post("/api/login")
            .send({
                email: "billy@gmail.com",
                password: "0000"
            })
            .expect(200);

        assert.strictEqual(response.body.success, true);
        assert.strictEqual(typeof response.body.token, "string");
        assert.strictEqual(response.body.message, "You are connected ! :D");
    });

    it("Error 401 : Email or Password -> Incorrect", async () => {
        const response = await reqTest
        .post("/api/login")
        .send({
            email: "billy@gmail.com",
            password: "random"
        })
        .expect(401);

        assert.strictEqual(response.body.success, false);
    });
});
