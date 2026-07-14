/**
 * @file Topic.js
 * @description Topic model
 */

const { DataTypes } = require("sequelize");
const sequelize = require("../config/config");

/**
 * @module Topic
 * @description Model of "topics" table
 *
 * title :
 * - index: true -> necessary for a reliable search bar
 *
 * id_section :
 * - link the topic with its sections
 *
 * id_category :
 * - link the topic with its category
 *
 * id_user :
 * - link the topic with its author
 *   (Ex : Who has the authorisation to modify this topic ?)
 */
const Topic = sequelize.define(
  "topics",
  {
    id_topic: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING(250),
      allowNull: false,
      index: true,
    },
    descirption: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    // Foreign Keys
    id_section: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_category: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  },
);

module.exports = Topic;
