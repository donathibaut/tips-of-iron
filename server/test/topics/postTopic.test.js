/**
 * @file postTopic.test.js
 * @description Test Topic Creation
 * ! DELETE DATABASE TEST RESULTS BEFORE RUNNING A NEW ONE !
 */

const app = require("../../src/app");
const { Topic, User, Category, Section } = require("../../src/models");

const supertest = require("supertest");
const reqTest = supertest(app);

const assert = require("node:assert");
const { describe, it, before } = require("node:test");

const jwt = require("jsonwebtoken");

// prettier-ignore
describe("POST topics", () => {

  let userID;
  let tokenTest;
  let wrongToken;

  // accessibility for all it()
  let testEmail;
  
  before(async () => {

    // Date.now() -> unique user for any test run (fix test errors)
    const emailDateNow = Date.now();
    testEmail = `testguy_${emailDateNow}@gmail.com`;

    const res = await reqTest
      .post("/api/user")
      .send({ username: "testGuy", email: testEmail, password: "password" });
    
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

  /*============================================================================*/
  it("Create topic + Success 201",
    async () => {
      await Section.destroy({ where: {} });
      await Topic.destroy({ where: {} });
      await User.destroy({ where: {} });
      await Category.destroy({ where: {} });

      await User.create(
        { 
          id_user: 1, 
          username: 'userTestTopic',
          email: "user@gmail.test",
          password: "$2a$12$lvLkudeg1.lgqrTOcdQCb.5He7nRQtZzApl1jkUT.7Soj8Pzvsmu.",
          role: 0,
        },
      );
      await Category.create(
        { id_category: 1, name: 'Interface' },
      );

      const response = await reqTest
        .post("/api/topic")
        .set("Authorization", `Bearer ${tokenTest}`)
        .send({ 
          title: "topicTitle", 
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          category: "Interface",
          sections: [
            {
              title: "sectionTitle",
              image_path: "",
              text: "Lorem ipsum dolor sit amet,",
              list_nb: 1,
            }
          ]
        })
        .expect(201);

      assert.strictEqual(response.body.success, true);
      assert.strictEqual(response.body.message, "Topic successfully created !");
    }
  );

  /*============================================================================*/
  it("Error 400 Form Field Empty",
    async () => {
      const response = await reqTest.post("/api/topic").set("Authorization", `Bearer ${tokenTest}`).send({}).expect(400);

      assert.strictEqual(response.body.message, "Form Field Empty");
    }
  );

  /*============================================================================*/
  it("Error 400 Topic Already Exists",
    async () => {
      const response = await reqTest
        .post("/api/topic")
        .set("Authorization", `Bearer ${tokenTest}`)
        .send({ 
          title: "topicTitle", 
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          category: "Interface",
          sections: [
            {
              title: "sectionTitle",
              image_path: "",
              text: "Lorem ipsum dolor sit amet,",
              list_nb: 1,
            }
          ]
        })
        .expect(400);

      assert.strictEqual(response.body.message, "Topic Already Exists");
    }
  );

  /*============================================================================*/
  it("Error 403",
    async () => {
      await Section.destroy({ where: {} });
      await Topic.destroy({ where: {} });
      await User.destroy({ where: {} });
      await Category.destroy({ where: {} });

      await User.create(
        { 
          id_user: 1, 
          username: 'userTestTopic',
          email: "user@gmail.test",
          password: "$2a$12$lvLkudeg1.lgqrTOcdQCb.5He7nRQtZzApl1jkUT.7Soj8Pzvsmu.",
          role: 0,
        },
      );
      await Category.create(
        { id_category: 1, name: 'Interface' },
      );

      const response = await reqTest
        .post("/api/topic")
        .set("Authorization", `Bearer ${wrongToken}`)
        .send({ 
          title: "topicTitle", 
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          category: "Interface",
          sections: [
            {
              title: "sectionTitle",
              image_path: "",
              text: "Lorem ipsum dolor sit amet,",
              list_nb: 1,
            }
          ]
        }).expect(403);

      assert.strictEqual(response.body.success, false);
    }
  );

  /*============================================================================*/
  it("Error 404",
    async () => {
      await Section.destroy({ where: {} });
      await Topic.destroy({ where: {} });
      await User.destroy({ where: {} });
      await Category.destroy({ where: {} });

      await User.create(
        { 
          id_user: 1, 
          username: 'userTestTopic',
          email: "user@gmail.test",
          password: "$2a$12$lvLkudeg1.lgqrTOcdQCb.5He7nRQtZzApl1jkUT.7Soj8Pzvsmu.",
          role: 0,
        },
      );
      await Category.create(
        { id_category: 1, name: 'Interface' },
      );

      const response = await reqTest
        .post("/api/topic")
        .set("Authorization", `Bearer ${tokenTest}`)
        .send({ 
          title: "topicTitle", 
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          category: "I DO NOT EXIST",
          sections: [
            {
              title: "sectionTitle",
              image_path: "",
              text: "Lorem ipsum dolor sit amet,",
              list_nb: 1,
            }
          ]
        })
        .expect(404);

      assert.strictEqual(response.body.success, false);
    }
  );
});
