/**
 * @file sectionService.js
 * @description Section CRUD
 */

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
 * @function sectionFindAll
 * @description Find All Sections || null
 * @param {object} Section - Section Model
 * @returns {Promise<Object|null>}
 */
const sectionFindAll = async (Section) => {
  return await findAll(Section);
};

/*============================================================================*/
/**
 * @async
 * @function sectionFindOne
 * @description Find One Section || null
 * @param {object} Section - Section Model
 * @param {object} target - searched section
 * @returns {Promise<Object|null>}
 */
const sectionFindOne = async (Section, target) => {
  if (!target) {
    return null;
  }

  if (target.sectionname && target.title !== "") {
    return await findOne(Section, { where: { title: target.title } });
  } else {
    return null;
  }
};

/*============================================================================*/
/**
 * @async
 * @function sectionFindByPk
 * @description Find Section By ID || null
 * @param {object} Section - Section Model
 * @param {number} id_section
 * @returns {Promise<Object|null>}
 */
const sectionFindByPk = async (Section, id_section) => {
  return await findByPk(Section, id_section);
};

/*============================================================================*/
/**
 * @async
 * @function sectionCreate
 * @description Create a new section || null
 * @param {object} Section - Section Model
 * @param {object} form - creation form
 * @returns {Promise<Object|null>}
 */
const sectionCreate = async (Section, form) => {
  // is it empty ?
  if (
    !form.sectionname ||
    !form.email ||
    !form.password ||
    form.sectionname === "" ||
    form.email === "" ||
    form.password === ""
  ) {
    throw new Error("Form Field Empty");
  }

  const isSection = await sectionFindOne(Section, form);

  if (isSection) {
    throw new Error("Section Already Exists");
  }

  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(form.password, saltRounds);
    const newSection = await create(Section, {
      sectionname: form.sectionname,
      email: form.email,
      password: hashedPassword,
    });
    return {
      success: true,
      message: "Section successfully created !",
      section: newSection,
    };
  } catch (e) {
    throw new Error(`Creation Failed : ${e.message}`);
  }
};

/*============================================================================*/
/**
 * @async
 * @function sectionUpdate
 * @description Update section personal data || null
 * @param {object} Section - Section Model
 * @param {object} form - update form
 * @param {object} targetID - section account ID
 * @returns {Promise<Object|null>}
 */
const sectionUpdate = async (Section, form, targetID) => {
  // is it empty ?
  if (
    !form.sectionname ||
    !form.email ||
    !form.password ||
    form.sectionname === "" ||
    form.email === "" ||
    form.password === ""
  ) {
    throw new Error("Form Field Empty");
  }

  const isSection = await sectionFindByPk(Section, targetID);

  if (!isSection) {
    throw new Error("Section Not Found");
  }

  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(form.password, saltRounds);
    await update(
      Section,
      {
        sectionname: form.sectionname,
        email: form.email,
        password: hashedPassword,
      },
      {
        where: { id_section: targetID },
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
 * @function sectionDestroy
 * @description Destroy section account || null
 * @param {object} Section - Section Model
 * @param {object} targetID - Targeted Section ID
 * @returns {Promise<Object|null>}
 */
const sectionDestroy = async (Section, targetID) => {
  const isSection = await sectionFindByPk(Section, targetID);

  if (isSection) {
    try {
      await destroy(Section, {
        where: { id_section: targetID },
      });

      return {
        success: true,
        message: "Section successfully deleted !",
      };
    } catch (e) {
      throw new Error(`Deletion Failed : ${e.message}`);
    }
  } else {
    throw new Error("Section Not Found");
  }
};

module.exports = {
  sectionFindAll,
  sectionFindOne,
  sectionFindByPk,
  sectionCreate,
  sectionUpdate,
  sectionDestroy,
};
