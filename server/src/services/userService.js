/**
 * @file userService.js
 * @description CRUD User
 */

const { findAll, findByPk } = require("./basicService");

const User = require("../models/User");

const userFindAll = async () => {
  return await findAll(User);
};

const userFindByPk = async (id) => {
  return await findByPk(User, id);
};

const userFindByKey = require("./userServices/userFindByKey");
const userCreate = require("./userServices/userCreate");
const userUpdate = require("./userServices/userUpdate");
const userDestroy = require("./userServices/userDestroy");

module.exports = {
  userFindAll,
  userFindByPk,
  userFindByKey,
  userCreate,
  userUpdate,
  userDestroy,
};
