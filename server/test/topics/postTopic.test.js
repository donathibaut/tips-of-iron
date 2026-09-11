/**
 * @file postTopic.test.js
 * @description Test Topic Creation
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

  let newUser;
  let userID;
  let userEmail;
  let userRole;

  let tokenTest;
  let wrongToken;
  
  before(async () => {
    await Section.destroy({ where: {} });
    await Topic.destroy({ where: {} });
    await User.destroy({ where: {} });
    await Category.destroy({ where: {} });

    newUser = await User.create(
      { 
        id_user: 1, 
        username: 'userTestTopic',
        email: "user@gmail.test",
        password: "$2a$12$lvLkudeg1.lgqrTOcdQCb.5He7nRQtZzApl1jkUT.7Soj8Pzvsmu.",
        role: 1,
      },
    );
    
    userID = newUser?.id_user || newUser?.id;
    userEmail = newUser?.email || newUser?.email;
    userRole = newUser?.role || newUser?.role;

    tokenTest = jwt.sign(
      { id_user: userID, email: userEmail, role: userRole },
      process.env.SECRET_KEY,
      { expiresIn: "1h" },
    );

    wrongToken = jwt.sign(
      { id_user: 999, email: "xxxxxxx@xxxx.com", role: 999 },
      process.env.SECRET_KEY,
      { expiresIn: "1h" },
    );

    await Category.create(
      { id_category: 1, name: 'Interface' },
    );
  });

  /*============================================================================*/
  it("Create topic + Success 201",
    async () => {
      await Section.destroy({ where: {} });
      await Topic.destroy({ where: {} });

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
              image_path: "https://hoi4.paradoxwikis.com/images/2/2f/Experience_army.png",
              text: "Lorem ipsum dolor sit amet,",
              list_nb: 1,
            }
          ]
        })
        .expect(201);

      assert.strictEqual(response.body.success, true);
      assert.strictEqual(response.body.message, "Topic successfully created!");
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
  it("Error 400 -> Topic title is too long",
    async () => {
      const response = await reqTest
        .post("/api/topic")
        .set("Authorization", `Bearer ${tokenTest}`)
        .send({ 
          title: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec qu", 
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

      assert.strictEqual(response.body.message, "Topic title is too long");
    }
  );

  /*============================================================================*/
  it("Error 400 -> Section title is too long",
    async () => {
      const response = await reqTest
        .post("/api/topic")
        .set("Authorization", `Bearer ${tokenTest}`)
        .send({ 
          title: "topicNotExist", 
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          category: "Interface",
          sections: [
            {
              title: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec qu",
              image_path: "",
              text: "Lorem ipsum dolor sit amet,",
              list_nb: 1,
            }
          ]
        })
        .expect(400);

      assert.strictEqual(response.body.message, "Section title is too long");
    }
  );

  /*============================================================================*/
  it('Error 400 -> URL protocol is not "https:"',
    async () => {
      const response = await reqTest
        .post("/api/topic")
        .set("Authorization", `Bearer ${tokenTest}`)
        .send({ 
          title: "topicNotExist", 
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          category: "Interface",
          sections: [
            {
              title: "sectionTitle",
              image_path: "http://hoi4.paradoxwikis.com/images/2/2f/Experience_army.png",
              text: "Lorem ipsum dolor sit amet,",
              list_nb: 1,
            }
          ]
        })
        .expect(400);

      assert.strictEqual(response.body.message, 'URL protocol is not "https:"');
    }
  );

  /*============================================================================*/
  it("Error 400 -> Invalid image_path URL format",
    async () => {
      const response = await reqTest
        .post("/api/topic")
        .set("Authorization", `Bearer ${tokenTest}`)
        .send({ 
          title: "topicNotExist", 
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          category: "Interface",
          sections: [
            {
              title: "sectionTitle",
              image_path: "not a path",
              text: "Lorem ipsum dolor sit amet,",
              list_nb: 1,
            }
          ]
        })
        .expect(400);

      assert.strictEqual(response.body.message, "Invalid image_path URL format");
    }
  );

  /*============================================================================*/
  it("Error 400 -> Form Field Empty",
    async () => {
      await Section.destroy({ where: {} });
      await Topic.destroy({ where: {} });

      const response = await reqTest.post("/api/topic").set("Authorization", `Bearer ${tokenTest}`).send({}).expect(400);

      assert.strictEqual(response.body.message, "Form Field Empty");
    }
  );

  /*============================================================================*/
  it("Error 403 -> You don't have the right!",
    async () => {
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
            },
          ]
        })
        .expect(403);

      assert.strictEqual(response.body.success, false);
    }
  );

  /*============================================================================*/
  it("Error 404 -> Category not found",
    async () => {
      await Section.destroy({ where: {} });
      await Topic.destroy({ where: {} });

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
