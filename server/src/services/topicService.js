/**
 * @file topicService.js
 * @description Topic CRUD
 */

/* Imported Models for FOREIGN KEYS */
const { Section, Category } = require("../models");

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
 * @function topicFindByFK
 * @description Find All Topics BY FOREIGN KEY || null
 * @param {object} Topic - Topic Model
 * @param {object} fkTable - foreign key TABLE
 * @param {object} fk - foreign key
 * @returns {Promise<Array|null>} Topic + Section
 */
const topicFindByFK = async (Topic, fkTable, fk) => {
  const array = await findAll(Topic, {
    where: { [fkTable]: fk },
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
 * @param {object} target - searched topic title
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
 * @param {object} token - authentication token
 * @returns {Promise<Object|null>} new TOPIC + SECTIONS
 */
const topicCreate = async (Topic, form, token) => {
  // is it empty ?
  if (
    !form.title ||
    !form.description ||
    form.title === "" ||
    form.description === "" ||
    !form.category ||
    form.category === ""
  ) {
    throw new Error("Form Field Empty");
  }
  const category = await findOne(Category, { where: { name: form.category } });
  if (category === null) {
    const e = new Error("Category Not Found");
    e.table = "Category";
    throw e;
  }

  const isTopic = await topicFindOne(Topic, form.title);

  if (isTopic) {
    throw new Error("Topic Already Exists");
  }

  try {
    const newTopic = await create(
      Topic,
      {
        title: form.title,
        description: form.description,
        id_category: category.id_category,
        id_user: token.id_user,

        // Section inserts
        Sections: form.sections.map((section) => ({
          title: section.title,
          image_path: section.image_path,
          text: section.text,
          list_nb: section.list_nb,
          id_user: token.id_user,
        })),
      },
      {
        include: [{ model: Section }],
      },
    );
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
 * @param {object} targetID - topic ID
 * @returns {Promise<Object|null>} update TOPIC + SECTIONS
 */
const topicUpdate = async (Topic, form, targetID) => {
  // is it empty ?
  if (
    !form.title ||
    !form.description ||
    form.title === "" ||
    form.description === "" ||
    !form.category ||
    form.category === ""
  ) {
    throw new Error("Form Field Empty");
  }

  const category = await findOne(Category, { where: { name: form.category } });
  if (category === null) {
    const e = new Error("Category Not Found");
    e.table = "Category";
    throw e;
  }

  const isTopic = await topicFindByPk(Topic, targetID);

  if (!isTopic) {
    throw new Error("Topic Not Found");
  }

  // TRANSACTION -> Secure "sequelize" operations (1. update topic; 2. destroy section; 3. create section)
  const transaction = await sequelize.transaction();
  try {
    await update(
      Topic,
      {
        title: form.title,
        description: form.description,
        id_category: category.id_category,
        id_user: token.id_user,
      },
      { where: { id_topic: targetID }, transaction: transaction },
    );

    await destroy(Section, {
      where: { id_topic: targetID },
      transaction: transaction,
    });

    await Section.bulkCreate(
      form.sections.map((section) => ({
        title: section.title,
        image_path: section.image_path,
        text: section.text,
        list_nb: section.list_nb,
        id_topic: targetID,
      })),
      { transaction: transaction },
    );

    await transaction.commit();

    return {
      success: true,
      message: "Information successfully updated !",
    };
  } catch (e) {
    await transaction.rollback();
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
 * @returns {Promise<Object|null>} delete TOPIC + SECTIONS
 */
const topicDestroy = async (Topic, targetID) => {
  const isTopic = await topicFindByPk(Topic, targetID);

  if (isTopic) {
    // TRANSACTION -> Secure "destroy" operations (1. sections; 2. Topic)
    const transaction = await sequelize.transaction();
    try {
      await destroy(Section, {
        where: { id_topic: targetID },
        transaction: transaction,
      });

      await destroy(Topic, {
        where: { id_topic: targetID },
        transaction: transaction,
      });

      await transaction.commit();

      return {
        success: true,
        message: "Topic successfully deleted !",
      };
    } catch (e) {
      await transaction.rollback();
      throw new Error(`Deletion Failed : ${e.message}`);
    }
  } else {
    throw new Error("Topic Not Found");
  }
};

module.exports = {
  topicFindByFK,
  topicFindOne,
  topicFindByPk,
  topicCreate,
  topicUpdate,
  topicDestroy,
};
