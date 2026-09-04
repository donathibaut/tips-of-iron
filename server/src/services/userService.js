/**
 * @file userService.js
 * @description User CRUD
 */

// Necessary to use Op.or ("OR" for Sequelize filters)
const { Op, Error } = require("sequelize");

const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");

const {
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
 * @param {Object} User - User Model
 * @param {Object} target - searched user
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
 * @param {Object} User - User Model
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
 * @param {Object} User - User Model
 * @param {Object} form - creation form
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
      message: "User successfully created!",
      user: newUser,
    };
  } catch (e) {
    throw new Error(`${e.message}`);
  }
};

/*============================================================================*/
/**
 * @async
 * @function userUpdate
 * @description Update user personal data + update token || null
 * @param {Object} User - User Model
 * @param {Object} form - update form
 * @param {Object} targetID - user account ID
 * @returns {Promise<Object|null>}
 */
const userUpdate = async (User, form, targetID) => {
  const user = await findByPk(User, targetID);

  if (!user) {
    throw new Error("User Not Found");
  }

  if (form.password && form.newPassword) {
    const verifPassword = await bcrypt.compare(form.password, user.password);
    if (!verifPassword) {
      throw new Error("Incorrect Password...");
    }
  }

  try {
    const updateData = {};

    if (form.password && form.newPassword) {
      const saltRounds = 10;
      updateData.password = await bcrypt.hash(form.newPassword, saltRounds);
    }
    if (form.email) {
      updateData.email = form.email;
    }
    if (form.username) {
      updateData.username = form.username;
    }

    await update(User, updateData, {
      where: { id_user: targetID },
    });

    // UPDATE TOKEN
    const newUser = await userFindByPk(User, targetID);

    if (!newUser) {
      throw new Error("User Not Found");
    }

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
      message: "Information successfully updated!",
    };
  } catch (e) {
    throw new Error(`${e.message}`);
  }
};

/*============================================================================*/
/**
 * @async
 * @function userDestroy
 * @description Destroy user account || null
 * @param {Object} User - User Model
 * @param {Object} targetID - Targeted User ID
 * @param {String} password
 * @returns {Promise<Object|null>}
 */
const userDestroy = async (User, targetID, password) => {
  const user = await findByPk(User, targetID);

  if (!user) {
    throw new Error("User Not Found");
  }

  const verifPassword = await bcrypt.compare(password, user.password);

  if (!verifPassword) {
    throw new Error("Incorrect Password...");
  }

  try {
    await destroy(User, {
      where: { id_user: targetID },
    });

    return {
      success: true,
      message: "User successfully deleted!",
    };
  } catch (e) {
    throw new Error(`${e.message}`);
  }
};

module.exports = {
  userFindOne,
  userFindByPk,
  userCreate,
  userUpdate,
  userDestroy,
};
