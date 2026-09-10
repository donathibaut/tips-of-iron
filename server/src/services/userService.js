/**
 * @file userService.js
 * @description User CRUD
 */

// Necessary to use Op.or ("OR" for Sequelize filters)
const { Error } = require("sequelize");

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
 * @description Find One User BY username OR email || null
 * @param {Object} User - User Model
 * @param {String} type - username || email
 * @param {String} target - searched user (username || email)
 * @returns {Promise<Object|null>}
 */
const userFindOne = async (User, type, target) => {
  if (!target || !type) {
    return null;
  }

  // is target
  if (target && target !== "") {
    return await findOne(User, {
      where: {
        [type]: target,
      },
      attributes: {
        exclude: ["password"],
      },
    });
  }

  return null;
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

  // check USERNAME & EMAIL length
  if (form.username.length > 50) {
    throw new Error("Username is too long");
  }
  if (form.email.length > 150) {
    throw new Error("Email is too long");
  }

  // check PASSWORD format & length
  const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^]).{8,}/;
  const pwdFormatCheck = regex.test(form.password);
  if (!pwdFormatCheck) {
    throw new Error("Password is too short or Password format is incorrect");
  }

  // IS USERNAME
  const isUsername = await userFindOne(User, "username", form.username);
  if (isUsername) {
    throw new Error("Username Already Exists");
  }

  // IS EMAIL
  const isEmail = await userFindOne(User, "email", form.email);
  if (isEmail) {
    throw new Error("Email Already Exists");
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
      // check NEW PASSWORD format & length
      const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^]).{8,}/;
      const pwdFormatCheck = regex.test(form.newPassword);
      if (!pwdFormatCheck) {
        throw new Error(
          "Password is too short or Password format is incorrect",
        );
      }
      // hash NEW PASSWORD
      const saltRounds = 10;
      updateData.password = await bcrypt.hash(form.newPassword, saltRounds);
    }

    // IS USERNAME
    if (form.username) {
      // check length
      if (form.username.length > 50) {
        throw new Error("Username is too long");
      }

      if (user.username !== form.username) {
        const isUsername = await userFindOne(User, "username", form.username);
        if (isUsername) {
          throw new Error("Username Already Exists");
        }
      }

      updateData.username = form.username;
    }

    // IS EMAIL
    if (form.email) {
      // check length
      if (form.email.length > 150) {
        throw new Error("Email is too long");
      }

      if (user.email !== form.email) {
        const isEmail = await userFindOne(User, "email", form.email);
        if (isEmail) {
          throw new Error("Email Already Exists");
        }
      }

      updateData.email = form.email;
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
