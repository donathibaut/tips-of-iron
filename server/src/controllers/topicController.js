/**
 * @file topicController.js
 * @description Topic CRUD Controller
 */

const Topic = require("../models/Topic");
const tableName = "Topic";

const {
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
 * @function getTopicById
 * @description Controller : Read Topic
 * @param {Object} req - Targeted topic ID
 * @param {Object} res
 * @returns {Promise<void>} Topic Data || null
 */
const getTopicById = async (req, res) => {
  try {
    const id_topic = req.params.id_topic;

    const topic = await topicFindByPk(Topic, id_topic);

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
  try {
    const result = await topicCreate(Topic, req.body);

    return successCreated(res, result.message, result.topic);
  } catch (e) {
    if (
      e.message === "Form Field Empty" ||
      e.message === "Topic Already Exists"
    ) {
      return badRequest(res, e.message);
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
    const isTopic = await topicFindByPk(Topic, req.params.id_topic);
    if (!isTopic) {
      return notFound(res, tableName);
    }

    if (
      Number(req.token.id_topic) === Number(req.params.id_topic) ||
      req.token.role === 1
    ) {
      const topic = await topicUpdate(Topic, req.body, req.params.id_topic);
      return success(res, topic.message);
    } else {
      const forbiddenMessage = "You don't have the right !";
      return forbidden(res, forbiddenMessage);
    }
  } catch (e) {
    if (e.message === "Form Field Empty") {
      return badRequest(res, e.message);
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
    const isTopic = await topicFindByPk(Topic, req.params.id_topic);
    if (!isTopic) {
      return notFound(res, tableName);
    }

    if (
      Number(req.token.id_topic) === Number(req.params.id_topic) ||
      req.token.role === 1
    ) {
      const topic = await topicDestroy(Topic, req.params.id_topic);
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
  getTopicById,
  postTopic,
  patchTopic,
  deleteTopic,
};
