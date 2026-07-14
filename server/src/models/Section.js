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
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    image_path: {
      type: DataTypes.STRING(250),
      allowNull: true,
    },
    list_nb: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    // Foreign Keys
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
