/**
 * @file User.js
 * @description User model
 */

const { DataTypes } = require("sequelize");
const sequelize = require("../config/config");

/**
 * @module User
 * @description Model of "users" table
 *
 * role :
 * - 0 = member (default)
 * - 1 = admin
 * - 2 = author
 */
const User = sequelize.define(
  "users",
  {
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(150),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    role: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  },
);

module.exports = User;
