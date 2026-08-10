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
    User
*/
// id_user
User.hasMany(Topic, { foreignKey: "id_user" });
Topic.belongsTo(User, { foreignKey: "id_user" });
User.hasMany(Section, { foreignKey: "id_user" });
Section.belongsTo(User, { foreignKey: "id_user" });
/* 
    Topic
*/
// id_section
Topic.hasMany(Section, { foreignKey: "id_topic" });
Section.belongsTo(Topic, { foreignKey: "id_topic" });
/* 
    Category
*/
// id_category
Category.hasMany(Topic, { foreignKey: "id_category" });
Topic.belongsTo(Category, { foreignKey: "id_category" });

module.exports = {
  User,
  Topic,
  Section,
  Category,
};
