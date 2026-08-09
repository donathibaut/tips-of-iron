/**
 * @file deleteTopic.test.js
 * @description Test Topic Deletion
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
describe("DELETE topics", () => {

  // Change if necessary
  let topicID;
  const testTitle = "testTitle";
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

  it("Delete topic + Success 200",
    async () => {

      const response = await reqTest
        .delete(`/api/topic/${topicID}`)
        .set("Authorization", `Bearer ${tokenTest}`)
        .expect(200);

      assert.strictEqual(response.body.success, true);
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
      await Topic.create(
        { 
          title: testTitle,
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          id_category: 1,
          id_user: 1,
          Sections: [
            {
              title: "Titre de la section",
              text: "Contenu de la section...",
              id_user: 1,
            }
          ]
        }, {include: [Section]},
      );

      findTopic = await Topic.findOne({where:{title: testTitle}});
      topicID = findTopic?.id_topic;

      const response = await reqTest
        .delete(`/api/topic/${topicID}`)
        .set("Authorization", `Bearer ${wrongToken}`)
        .expect(403);

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
      await Topic.create(
        { 
          title: testTitle,
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          id_category: 1,
          id_user: 1,
          Sections: [
            {
              title: "Titre de la section",
              text: "Contenu de la section...",
              id_user: 1,
            }
          ]
        }, {include: [Section]},
      );

      findTopic = await Topic.findOne({where:{title: testTitle}});
      topicID = findTopic?.id_topic;

      const response = await reqTest
        .delete(`/api/topic/${topicID}`)
        .set("Authorization", `Bearer ${tokenTest}`)
        .expect(404);

      assert.strictEqual(response.body.message, "Topic Not Found");
    }
  );
});
