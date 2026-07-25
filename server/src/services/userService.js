/**
 * @file userService.js
 * @description User CRUD
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
 * @function userFindAll
 * @description Find All Users || null
 * @param {object} User - User Model
 * @returns {Promise<Object|null>}
 */
const userFindAll = async (User) => {
  return await findAll(User, {
    attributes: { exclude: ["password"] },
  });
};

/*============================================================================*/
/**
 * @async
 * @function userFindOne
 * @description Find One User || null
 * @param {object} User - User Model
 * @param {object} target - searched user
 * @returns {Promise<Object|null>}
 */
const userFindOne = async (User, target) => {
  if (target.username || target.email) {
    return await findOne(User, {
      where: {
        [Op.or]: [{ username: target.username }, { email: target.email }],
      },
      attributes: {
        exclude: ["password"],
      },
    });
  } else {
    throw new Error("User Not Found");
  }
};

/*============================================================================*/
/**
 * @async
 * @function userFindByPk
 * @description Find User By ID || null
 * @param {object} User - User Model
 * @param {number} id
 * @returns {Promise<Object|null>}
 */
const userFindByPk = async (User, id) => {
  return await findByPk(User, id, { attributes: { exclude: ["password"] } });
};

/*============================================================================*/
/**
 * @async
 * @function userCreate
 * @description Create a new user || null
 * @param {object} User - User Model
 * @param {object} form - creation form
 * @returns {Promise<Object|null>}
 */
const userCreate = async (User, form) => {
  const isUser = await userFindOne(User, form);

  if (isUser) {
    throw new Error("User Already Exists");
  }

  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(form.password, saltRounds);
    await create(User, {
      username: form.username,
      email: form.email,
      password: hashedPassword,
    });
    return {
      success: true,
      message: "User successfully created !",
    };
  } catch (e) {
    return {
      success: false,
      message: `Creation Failed : ${e.message} :(`,
    };
  }
};

/*============================================================================*/
/**
 * @async
 * @function userUpdate
 * @description Update user personal data || null
 * @param {object} User - User Model
 * @param {object} form - update form
 * @returns {Promise<Object|null>}
 */
const userUpdate = async (User, form) => {
  const isUser = await userFindByPk(User, form.id);

  if (!isUser) {
    throw new Error("User Not Found");
  }

  try {
    await update(
      User,
      {
        username: form.username,
        email: form.email,
        password: form.password,
      },
      {
        where: { id: form.id },
      },
    );

    return {
      success: true,
      message: "Information successfully updated !",
    };
  } catch (e) {
    return {
      success: false,
      message: `Update Failed : ${e.message} :(`,
    };
  }
};

/*============================================================================*/
/**
 * @async
 * @function userDestroy
 * @description Destroy user account || null
 * @param {object} User - User Model
 * @param {object} id - Targeted User ID
 * @returns {Promise<Object|null>}
 */
const userDestroy = async (User, id) => {
  const isUser = await userFindByPk(User, id);

  if (isUser) {
    try {
      await destroy(User, {
        where: { id: id },
      });

      return {
        success: true,
        message: "User successfully deleted !",
      };
    } catch (e) {
      return {
        success: false,
        message: `Deletion Failed : ${e.message} :(`,
      };
    }
  } else {
    throw new Error("User Not Found : ID Issue");
  }
};

module.exports = {
  userFindAll,
  userFindOne,
  userFindByPk,
  userCreate,
  userUpdate,
  userDestroy,
};
