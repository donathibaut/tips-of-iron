/**
 * @file topicService.js
 * @description Topic CRUD
 */

/* Imported Models for FOREIGN KEYS */
const { Section } = require("../models");

const {
  findAll,
  findOne,
  findByPk,
  create,
  update,
  destroy,
} = require("./basicService");

/*============================================================================*/
/**
 * @async
 * @function topicFindByUser
 * @description Find All User Topics || null
 * @param {object} Topic - Topic Model
 * @param {object} userID
 * @returns {Promise<Array|null>} Topic + Section
 */
const topicFindByUser = async (Topic, userID) => {
  const array = await findAll(Topic, {
    where: { id_user: userID },
    include: [{ model: Section }],
  });

  if (array.length !== 0) {
    return array;
  } else {
    return null;
  }
};

/*============================================================================*/
/**
 * @async
 * @function topicFindOne
 * @description Find One Topic || null
 * @param {object} Topic - Topic Model
 * @param {object} target - searched topic
 * @returns {Promise<Object|null>} Topic + Section
 */
const topicFindOne = async (Topic, target) => {
  if (!target) {
    return null;
  }

  if (target.title && target.title !== "") {
    return await findOne(Topic, {
      where: { title: target.title },
      include: [{ model: Section }],
    });
  } else {
    return null;
  }
};

/*============================================================================*/
/**
 * @async
 * @function topicFindByPk
 * @description Find Topic By ID || null
 * @param {object} Topic - Topic Model
 * @param {number} id_topic
 * @returns {Promise<Object|null>} Topic + Section
 */
const topicFindByPk = async (Topic, id_topic) => {
  return await findByPk(Topic, id_topic, { include: [{ model: Section }] });
};

/*============================================================================*/
/**
 * @async
 * @function topicCreate
 * @description Create a new topic || null
 * @param {object} Topic - Topic Model
 * @param {object} form - creation form
 * @returns {Promise<Object|null>}
 */
const topicCreate = async (Topic, form) => {
  // is it empty ?
  if (
    !form.title ||
    !form.description ||
    form.title === "" ||
    form.description === ""
  ) {
    throw new Error("Form Field Empty");
  }

  const isTopic = await topicFindOne(Topic, form);

  if (isTopic) {
    throw new Error("Topic Already Exists");
  }

  try {
    const newTopic = await create(Topic, {
      topicname: form.topicname,
      email: form.email,
    });
    return {
      success: true,
      message: "Topic successfully created !",
      topic: newTopic,
    };
  } catch (e) {
    throw new Error(`Creation Failed : ${e.message}`);
  }
};

/*============================================================================*/
/**
 * @async
 * @function topicUpdate
 * @description Update topic personal data || null
 * @param {object} Topic - Topic Model
 * @param {object} form - update form
 * @param {object} targetID - topic account ID
 * @returns {Promise<Object|null>}
 */
const topicUpdate = async (Topic, form, targetID) => {
  // is it empty ?
  if (
    !form.title ||
    !form.description ||
    form.title === "" ||
    form.description === ""
  ) {
    throw new Error("Form Field Empty");
  }

  const isTopic = await topicFindByPk(Topic, targetID);

  if (!isTopic) {
    throw new Error("Topic Not Found");
  }

  try {
    await update(
      Topic,
      {
        topicname: form.topicname,
        email: form.email,
      },
      {
        where: { id_topic: targetID },
      },
    );

    return {
      success: true,
      message: "Information successfully updated !",
    };
  } catch (e) {
    throw new Error(`Update Failed : ${e.message}`);
  }
};

/*============================================================================*/
/**
 * @async
 * @function topicDestroy
 * @description Destroy topic account || null
 * @param {object} Topic - Topic Model
 * @param {object} targetID - Targeted Topic ID
 * @returns {Promise<Object|null>}
 */
const topicDestroy = async (Topic, targetID) => {
  const isTopic = await topicFindByPk(Topic, targetID);

  if (isTopic) {
    try {
      await destroy(Topic, {
        where: { id_topic: targetID },
      });

      return {
        success: true,
        message: "Topic successfully deleted !",
      };
    } catch (e) {
      throw new Error(`Deletion Failed : ${e.message}`);
    }
  } else {
    throw new Error("Topic Not Found");
  }
};

module.exports = {
  topicFindAll,
  topicFindByUser,
  topicFindOne,
  topicFindByPk,
  topicCreate,
  topicUpdate,
  topicDestroy,
};
