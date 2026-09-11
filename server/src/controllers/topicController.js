/**
 * @file topicController.js
 * @description Topic CRUD Controller
 */

const { Topic, Category } = require("../models");
const tableName = "Topic";

const { findOne } = require("../services/basicService");

const {
  topicsFindByFK,
  topicFindOne,
  topicFindByPk,
  topicCreate,
  topicUpdate,
  topicDestroy,
  topicsFindByQuery,
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
 * @param {Object} req - Targeted User ID or Category name
 * @param {Object} res
 * @returns {Promise<void>} All Topics from FK || null
 */
const getTopicsByFK = async (req, res) => {
  let id_user = req.params.id_user;
  let category = req.params.name;

  let fkCol;
  let fk;
  try {
    // IF USER
    if (id_user && id_user !== "") {
      fkCol = "id_user";
      fk = id_user;
    }
    // IF CATEGORY
    else if (category && category !== "") {
      // category NAME TO ID
      const findCategory = await findOne(Category, {
        where: { name: category },
      });
      if (findCategory === null) {
        return notFound(res, "Category");
      }
      fkCol = "id_category";
      fk = findCategory.id_category;
    }

    const topic = await topicsFindByFK(Topic, fkCol, fk);

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
 * @function getTopicsByQuery
 * @description Controller : Read Topics from searched title
 * @param {Object} req - Targeted topic title
 * @param {Object} res
 * @returns {Promise<void>} All Topics from search query || null
 */
const getTopicsByQuery = async (req, res) => {
  try {
    const searchTitle = req.query.search;

    if (!searchTitle) {
      const err = "Title Missing";
      return badRequest(res, err);
    }

    const research = await topicsFindByQuery(Topic, searchTitle);

    if (research === null || research.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No matching topic",
        research: [],
      });
    }

    return successOk(res, tableName, research);
  } catch (e) {
    return servError(res, e);
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
  if (!token) {
    return forbidden(res, "You don't have the right!");
  }

  try {
    const result = await topicCreate(Topic, req.body, token);

    return successCreated(res, result.message, result.topic);
  } catch (e) {
    if (e.message === "You don't have the right!") {
      return forbidden(res, e.message);
    }
    if (
      e.message === "Form Field Empty" ||
      e.message === "Topic Already Exists" ||
      e.message === "Topic title is too long" ||
      e.message === "Section title is too long" ||
      e.message === 'URL protocol is not "https:"' ||
      e.message === "Invalid image_path URL format"
    ) {
      return badRequest(res, e.message);
    }
    if (e.message === "Category Not Found") {
      return notFound(res, "Category");
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
      const forbiddenMessage = "You don't have the right!";
      return forbidden(res, forbiddenMessage);
    }
  } catch (e) {
    if (
      e.message === "Form Field Empty" ||
      e.message === "Topic Title Already Exists" ||
      e.message === "Topic title is too long" ||
      e.message === "Section title is too long" ||
      e.message === 'URL protocol is not "https:"' ||
      e.message === "Invalid image_path URL format"
    ) {
      return badRequest(res, e.message);
    }
    if (e.message === "Category Not Found") {
      return notFound(res, "Category");
    }
    if (e.message === "Topic Not Found") {
      return notFound(res, "Topic");
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
      const forbiddenMessage = "You don't have the right!";
      return forbidden(res, forbiddenMessage);
    }
  } catch (e) {
    return errorBlock(res, e, tableName);
  }
};

module.exports = {
  getTopicsByFK,
  getTopicsByQuery,
  getTopic,
  postTopic,
  patchTopic,
  deleteTopic,
};
