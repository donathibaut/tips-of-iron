/**
 * @file models/index.js
 * @description Déclaration des modèles + associations
 */

// Déclaration des modèles
const User = require("./User");
const Topic = require("./Topic");
const Section = require("./Section");
const Category = require("./Category");

// Déclaration des associations entre les tables
/* 
    Topic
*/
// id_section
Section.hasMany(Topic, { foreignKey: "id_section" });
Topic.belongsTo(Section, { foreignKey: "id_section" });
// id_category
Category.hasMany(Topic, { foreignKey: "id_category" });
Topic.belongsTo(Category, { foreignKey: "id_category" });
// id_user
User.hasMany(Topic, { foreignKey: "id_user" });
Topic.belongsTo(User, { foreignKey: "id_user" });
/*
    Section
*/
// id_user
User.hasMany(Section, { foreignKey: "id_user" });
Section.belongsTo(User, { foreignKey: "id_user" });

module.exports = {
  User,
  Topic,
  Section,
  Category,
};
