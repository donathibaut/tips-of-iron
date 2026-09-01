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
 * @function userFindOne
 * @description Find One User || null
 * @param {object} User - User Model
 * @param {object} target - searched user
 * @returns {Promise<Object|null>}
 */
const userFindOne = async (User, target) => {
  if (!target) {
    return null;
  }

  if (
    (target.username && target.username !== "") ||
    (target.email && target.email !== "")
  ) {
    const opOr = [];
    if (target.username) opOr.push({ username: target.username });
    if (target.email) opOr.push({ email: target.email });

    return await findOne(User, {
      where: {
        // username OR email
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
 * @function userFindByPk
 * @description Find User By ID || null
 * @param {object} User - User Model
 * @param {number} id_user
 * @returns {Promise<Object|null>}
 */
const userFindByPk = async (User, id_user) => {
  return await findByPk(User, id_user, {
    attributes: { exclude: ["password"] },
  });
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
  // is it empty ?
  if (
    !form.username ||
    !form.email ||
    !form.password ||
    form.username === "" ||
    form.email === "" ||
    form.password === ""
  ) {
    throw new Error("Form Field Empty");
  }

  const isUser = await userFindOne(User, form);

  if (isUser) {
    throw new Error("User Already Exists");
  }

  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(form.password, saltRounds);
    const newUser = await create(User, {
      username: form.username,
      email: form.email,
      password: hashedPassword,
    });
    return {
      success: true,
      message: "User successfully created !",
      user: newUser,
    };
  } catch (e) {
    throw new Error(`Creation Failed : ${e.message}`);
  }
};

/*============================================================================*/
/**
 * @async
 * @function userUpdate
 * @description Update user personal data + update token || null
 * @param {object} User - User Model
 * @param {object} form - update form
 * @param {object} targetID - user account ID
 * @returns {Promise<Object|null>}
 */
const userUpdate = async (User, form, targetID) => {
  const isUser = await userFindByPk(User, targetID);

  if (!isUser) {
    throw new Error("User Not Found");
  }

  try {
    const updateData = {};

    if (form.password) {
      const saltRounds = 10;
      updateData.password = await bcrypt.hash(form.password, saltRounds);
    } else if (form.email) {
      updateData.email = form.email;
    } else if (form.username) {
      updateData.username = form.username;
    } else {
      throw new Error("Field Empty");
    }

    await update(User, updateData, {
      where: { id_user: targetID },
    });

    // UPDATE TOKEN
    const newUser = await userFindByPk(User, targetID);

    if (!newUser) {
      throw new Error("User Not Found");
    }

    // sign TOKEN
    const token = jwt.sign(
      {
        id_user: newUser.id_user,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: "7d",
      },
    );

    return {
      token: token,
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
 * @function userDestroy
 * @description Destroy user account || null
 * @param {object} User - User Model
 * @param {object} targetID - Targeted User ID
 * @returns {Promise<Object|null>}
 */
const userDestroy = async (User, targetID) => {
  const isUser = await userFindByPk(User, targetID);

  if (isUser) {
    try {
      await destroy(User, {
        where: { id_user: targetID },
      });

      return {
        success: true,
        message: "User successfully deleted !",
      };
    } catch (e) {
      throw new Error(`Deletion Failed : ${e.message}`);
    }
  } else {
    throw new Error("User Not Found");
  }
};

module.exports = {
  userFindOne,
  userFindByPk,
  userCreate,
  userUpdate,
  userDestroy,
};
