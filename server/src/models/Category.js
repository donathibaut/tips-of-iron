/**
 * @file Category.js
 * @description Category model
 */

const { DataTypes } = require("sequelize");
const sequelize = require("../config/config");

/**
 * @module Category
 * @description Model of "categories" table
 */
const Category = sequelize.define(
  "categories",
  {
    id_category: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  },
);

module.exports = Category;
