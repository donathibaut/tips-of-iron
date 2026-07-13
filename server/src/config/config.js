/**
 * @file config.js
 * @description Sequelize initialisation
 */

const { Sequelize } = require("sequelize");

const isEnvProduction = process.env.NODE_ENV === "production";

/**
 * Set Sequelize ('database', 'user', 'password', {})
 * @type {Sequelize}
 */
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.USER_NAME,
  process.env.USER_PASSWORD,
  {
    host: process.env.HOST,
    port: parseInt(process.env.DB_PORT) || 3307,
    dialect: "mysql",
    logging: false,
    dialectOptions: isEnvProduction
      ? {
          ssl: {
            require: true,
            rejectUnauthorized: true,
          },
        }
      : {},
  },
);

module.exports = sequelize;
