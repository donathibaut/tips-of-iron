/**
 * @file config.test.js
 * @description Config Tests
 */

const { before } = require("node:test");
const sequelize = require("../src/config/config");

before(async () => {
  try {
    // disable FK Checks for sequelize sync
    await sequelize.query("SET FOREIGN_KEY_CHECKS = 0");

    // delete then create tables according to models files
    await sequelize.sync({ force: true });

    // enable after sync
    await sequelize.query("SET FOREIGN_KEY_CHECKS = 1");
  } catch (e) {
    console.error("Test init ERROR:", e);
    process.exit(1);
  }
});
