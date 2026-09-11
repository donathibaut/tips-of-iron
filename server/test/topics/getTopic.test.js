/**
 * @file getTopic.test.js
 * @description Test Topic Read
 */

const app = require("../../src/app");
const { Topic, User, Category, Section } = require("../../src/models");

const supertest = require("supertest");
const reqTest = supertest(app);

const assert = require("node:assert");
const { describe, it } = require("node:test");

// prettier-ignore
describe("GET topic", () => {
  it("Error 404",
    async () => {
      await Section.destroy({ where: {} });
      await Topic.destroy({ where: {} });
      await User.destroy({ where: {} });
      await Category.destroy({ where: {} });

      const response = await reqTest.get("/api/topic/testTitle").expect(404);

      assert.strictEqual(response.body.success, false);
    }
  );

  it("Get topic + Success 200",
    async () => {
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
          title: "testTitle",
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
      
      const response = await reqTest
        .get(`/api/topic/testTitle`)
        .expect(200);

      assert.strictEqual(response.body.success, true);
    }
  );
});
