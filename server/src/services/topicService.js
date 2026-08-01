/**
 * @file topicService.js
 * @description Topic CRUD
 */

// Necessary to use Op.or ("OR" for Sequelize filters)
const { Op } = require("sequelize");

const bcrypt = require("bcrypt");

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
 * @function topicFindAll
 * @description Find All Topics || null
 * @param {object} Topic - Topic Model
 * @returns {Promise<Object|null>}
 */
const topicFindAll = async (Topic) => {
  return await findAll(Topic, {
    attributes: { exclude: ["password"] },
  });
};

/*============================================================================*/
/**
 * @async
 * @function topicFindOne
 * @description Find One Topic || null
 * @param {object} Topic - Topic Model
 * @param {object} target - searched topic
 * @returns {Promise<Object|null>}
 */
const topicFindOne = async (Topic, target) => {
  if (!target) {
    return null;
  }

  if (
    (target.topicname && target.topicname !== "") ||
    (target.email && target.email !== "")
  ) {
    const opOr = [];
    if (target.topicname) opOr.push({ topicname: target.topicname });
    if (target.email) opOr.push({ email: target.email });

    return await findOne(Topic, {
      where: {
        [Op.or]: opOr,
      },
      attributes: {
        exclude: ["password"],
      },
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
 * @returns {Promise<Object|null>}
 */
const topicFindByPk = async (Topic, id_topic) => {
  return await findByPk(Topic, id_topic, {
    attributes: { exclude: ["password"] },
  });
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
    !form.topicname ||
    !form.email ||
    !form.password ||
    form.topicname === "" ||
    form.email === "" ||
    form.password === ""
  ) {
    throw new Error("Form Field Empty");
  }

  const isTopic = await topicFindOne(Topic, form);

  if (isTopic) {
    throw new Error("Topic Already Exists");
  }

  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(form.password, saltRounds);
    const newTopic = await create(Topic, {
      topicname: form.topicname,
      email: form.email,
      password: hashedPassword,
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
    !form.topicname ||
    !form.email ||
    !form.password ||
    form.topicname === "" ||
    form.email === "" ||
    form.password === ""
  ) {
    throw new Error("Form Field Empty");
  }

  const isTopic = await topicFindByPk(Topic, targetID);

  if (!isTopic) {
    throw new Error("Topic Not Found");
  }

  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(form.password, saltRounds);
    await update(
      Topic,
      {
        topicname: form.topicname,
        email: form.email,
        password: hashedPassword,
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
  topicFindOne,
  topicFindByPk,
  topicCreate,
  topicUpdate,
  topicDestroy,
};
