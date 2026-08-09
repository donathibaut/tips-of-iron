/**
 * @file getCategories.test.js
 * @description Test Category Read
 * ! DELETE DATABASE TEST RESULTS BEFORE RUNNING A NEW ONE !
 */

const app = require("../../src/app");
const Category = require("../../src/models/Category");

const supertest = require("supertest");
const reqTest = supertest(app);

const assert = require("node:assert");
const { describe, it, before } = require("node:test");

// prettier-ignore
describe("GET categories", () => {
  it("Error 404",
    async () => {
      await Category.destroy({ where: {} });

      const response = await reqTest
        .get("/api/category/")
        .expect(404);

      assert.strictEqual(response.body.success, false);
    }
  );

  it("Get categories + Success 200",
    async () => {
      await Category.bulkCreate([
        { id_category: 1, name: 'Interface' },
        { id_category: 2, name: 'Air' },
        { id_category: 3, name: 'Land' },
        { id_category: 4, name: 'Marine' },
        { id_category: 5, name: 'Scenario Guide' },
      ]);

      const response = await reqTest
        .get(`/api/category/`)
        .expect(200);

      assert.strictEqual(response.body.success, true);
    }
  );
});
