/**
 * @file Section.js
 * @description Section model
 */

const { DataTypes } = require("sequelize");
const sequelize = require("../config/config");

/**
 * @module Section
 * @description Model of "sections" table
 *
 * list_nb :
 * - position number in the list of sections
 *   displayed in the topic.
 *
 * id_topic :
 * - section belongs to a topic
 *
 * id_user :
 * - author id of this section
 *   (Ex : Is the user authorised to modify the section ?)
 */
const Section = sequelize.define(
  "sections",
  {
    id_section: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    image_path: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    list_nb: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    // Foreign Keys
    id_topic: {
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

module.exports = Section;
