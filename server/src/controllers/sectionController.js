/**
 * @file sectionController.js
 * @description Section CRUD Controller
 */

const Section = require("../models/Section");
const tableName = "Section";

const {
  sectionFindByPk,
  sectionCreate,
  sectionUpdate,
  sectionDestroy,
} = require("../services/sectionService");
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
 * @function getSectionById
 * @description Controller : Read Section
 * @param {Object} req - Targeted section ID
 * @param {Object} res
 * @returns {Promise<void>} Section Data || null
 */
const getSectionById = async (req, res) => {
  try {
    const id_section = req.params.id_section;

    const section = await sectionFindByPk(Section, id_section);

    if (section === null) {
      return notFound(res, tableName);
    }

    return successOk(res, tableName, section);
  } catch (e) {
    return errorBlock(res, e, tableName);
  }
};

/*============================================================================*/
/**
 * @async
 * @function postSection
 * @description Controller : Create Section
 * @param {Object} req
 * @param {Object} res
 * @returns {Promise<void>} null
 */
const postSection = async (req, res) => {
  try {
    const result = await sectionCreate(Section, req.body);

    return successCreated(res, result.message, result.section);
  } catch (e) {
    if (
      e.message === "Form Field Empty" ||
      e.message === "Section Already Exists"
    ) {
      return badRequest(res, e.message);
    }
    return servError(res, e);
  }
};

/*============================================================================*/
/**
 * @async
 * @function patchSection
 * @description Controller : Update Section
 * @param {Object} req
 * @param {Object} res
 * @returns {Promise<void>} null
 */
const patchSection = async (req, res) => {
  try {
    const isSection = await sectionFindByPk(Section, req.params.id_section);
    if (!isSection) {
      return notFound(res, tableName);
    }

    if (
      Number(req.token.id_section) === Number(req.params.id_section) ||
      req.token.role === 1
    ) {
      const section = await sectionUpdate(
        Section,
        req.body,
        req.params.id_section,
      );
      return success(res, section.message);
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
 * @function deleteSection
 * @description Controller : Destroy Section
 * @param {Object} req
 * @param {Object} res
 * @returns {Promise<void>} null
 */
const deleteSection = async (req, res) => {
  try {
    const isSection = await sectionFindByPk(Section, req.params.id_section);
    if (!isSection) {
      return notFound(res, tableName);
    }

    if (
      Number(req.token.id_section) === Number(req.params.id_section) ||
      req.token.role === 1
    ) {
      const section = await sectionDestroy(Section, req.params.id_section);
      return success(res, section.message);
    } else {
      const forbiddenMessage = "You don't have the right !";
      return forbidden(res, forbiddenMessage);
    }
  } catch (e) {
    return errorBlock(res, e, tableName);
  }
};

module.exports = {
  getSectionById,
  postSection,
  patchSection,
  deleteSection,
};
