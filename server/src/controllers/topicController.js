/**
 * @file topicController.js
 * @description Topic CRUD Controller
 */

const Topic = require("../models/Topic");
const tableName = "Topic";

const {
  topicsFindByFK,
  topicFindOne,
  topicFindByPk,
  topicCreate,
  topicUpdate,
  topicDestroy,
} = require("../services/topicService");

const {
  success,
  successOk,
  successCreated,
  forbidden,
  notFound,
  servError,
  errorBlock,
  badRequest,
} = require("../utils/status");

/*============================================================================*/
/**
 * @async
 * @function getTopicsByFK
 * @description Controller : Read Topics from Foreign Key
 * @param {Object} req - Targeted user ID
 * @param {Object} res
 * @returns {Promise<void>} All Topics from FK || null
 */
const getTopicsByFK = async (req, res) => {
  let id_user = req.params.id_user;
  let id_category = req.params.id_category;

  let fkTable;
  let fk;
  try {
    if (id_user && id_user !== "") {
      fkTable = "id_user";
      fk = id_user;
    } else if (id_category && id_category !== "") {
      fkTable = "id_category";
      fk = id_category;
    } else {
      const err = "Foreign Key Missing";
      return badRequest(res, err);
    }

    const topic = await topicsFindByFK(Topic, fkTable, fk);

    if (topic === null) {
      return notFound(res, tableName);
    }

    return successOk(res, tableName, topic);
  } catch (e) {
    return errorBlock(res, e, tableName);
  }
};

/*============================================================================*/
/**
 * @async
 * @function getTopic
 * @description Controller : Read Topic
 * @param {Object} req - req.params
 * @param {Object} res
 * @returns {Promise<void>} Topic Data || null
 */
const getTopic = async (req, res) => {
  try {
    const topic = await topicFindOne(Topic, req.params);

    if (topic === null) {
      return notFound(res, tableName);
    }

    return successOk(res, tableName, topic);
  } catch (e) {
    return errorBlock(res, e, tableName);
  }
};

/*============================================================================*/
/**
 * @async
 * @function postTopic
 * @description Controller : Create Topic
 * @param {Object} req
 * @param {Object} res
 * @returns {Promise<void>} null
 */
const postTopic = async (req, res) => {
  const token = req.token;

  try {
    if (token) {
      const result = await topicCreate(Topic, req.body, token);

      return successCreated(res, result.message, result.topic);
    }
  } catch (e) {
    if (
      e.message === "Form Field Empty" ||
      e.message === "Topic Already Exists"
    ) {
      return badRequest(res, e.message);
    } else if (e.message === "Category Not Found" && e.table) {
      return notFound(res, e.table);
    }
    return servError(res, e);
  }
};

/*============================================================================*/
/**
 * @async
 * @function patchTopic
 * @description Controller : Update Topic
 * @param {Object} req
 * @param {Object} res
 * @returns {Promise<void>} null
 */
const patchTopic = async (req, res) => {
  try {
    const id_topic = req.params.id_topic;

    const isTopic = await topicFindByPk(Topic, id_topic);
    if (!isTopic) {
      return notFound(res, tableName);
    }

    if (
      (isTopic.id_user &&
        Number(isTopic.id_user) === Number(req.token.id_user)) ||
      req.token.role === 1
    ) {
      const topic = await topicUpdate(Topic, req.body, id_topic);
      return success(res, topic.message);
    } else {
      const forbiddenMessage = "You don't have the right !";
      return forbidden(res, forbiddenMessage);
    }
  } catch (e) {
    if (e.message === "Form Field Empty") {
      return badRequest(res, e.message);
    } else if (e.message === "Category Not Found" && e.table) {
      return notFound(res, e.table);
    }
    return errorBlock(res, e, tableName);
  }
};

/*============================================================================*/
/**
 * @async
 * @function deleteTopic
 * @description Controller : Destroy Topic
 * @param {Object} req
 * @param {Object} res
 * @returns {Promise<void>} null
 */
const deleteTopic = async (req, res) => {
  try {
    const id_topic = req.params.id_topic;

    const isTopic = await topicFindByPk(Topic, id_topic);
    if (!isTopic) {
      return notFound(res, tableName);
    }

    if (
      (isTopic.id_user &&
        Number(isTopic.id_user) === Number(req.token.id_user)) ||
      req.token.role === 1
    ) {
      const topic = await topicDestroy(Topic, id_topic);
      return success(res, topic.message);
    } else {
      const forbiddenMessage = "You don't have the right !";
      return forbidden(res, forbiddenMessage);
    }
  } catch (e) {
    return errorBlock(res, e, tableName);
  }
};

module.exports = {
  getTopicsByFK,
  getTopic,
  postTopic,
  patchTopic,
  deleteTopic,
};
