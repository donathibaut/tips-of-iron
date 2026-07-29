/**
 * @file basicService.js
 * @description basic functions for the Service files
 */

/**
 * @async
 * @function findAll
 * @param {object} model
 * @returns {Promise<Object|null>}
 * @description Find All data from the table || null
 */
const findAll = async (model, options = {}) => {
  if (model) {
    return await model.findAll(options);
  } else {
    throw new Error("Not Provided : Model Missing");
  }
};

/**
 * @async
 * @function findOne
 * @param {object} model
 * @param {object} target - Entity Value
 * @returns {Promise<Object|null>}
 * @description Find One data from the table || null
 */
const findOne = async (model, target) => {
  if (model) {
    if (target) {
      return await model.findOne(target);
    } else {
      return null;
    }
  } else {
    throw new Error("Not Provided : Model Missing");
  }
};

/**
 * @async
 * @function findByPk
 * @param {object} model
 * @param {number} id
 * @returns {Promise<Object|null>}
 * @description Find data by ID || null
 */
const findByPk = async (model, id, options = {}) => {
  if (model) {
    if (id) {
      return await model.findByPk(id, options);
    } else {
      return null;
    }
  } else {
    throw new Error("Not Provided : Model Missing");
  }
};

/**
 * @async
 * @function create
 * @param {object} model
 * @param {object} form
 * @returns {Promise<Object|null>}
 * @description Create new data in database || null
 */
const create = async (model, form) => {
  if (model) {
    if (form) {
      return await model.create(form);
    } else {
      return null;
    }
  } else {
    throw new Error("Not Provided : Model Missing");
  }
};

/**
 * @async
 * @function update
 * @param {object} model
 * @param {object} form
 * @param {object} target
 * @returns {Promise<Object|null>}
 * @description Update data in database || null
 */
const update = async (model, form, target) => {
  if (model) {
    if (form) {
      if (target) {
        return await model.update(form, target);
      } else {
        return null;
      }
    } else {
      throw new Error("Invalid Form");
    }
  } else {
    throw new Error("Not Provided : Model Missing");
  }
};

/**
 * @async
 * @function destroy
 * @param {object} model
 * @param {object} target
 * @returns {Promise<Object|null>}
 * @description Delete data in database || null
 */
const destroy = async (model, target) => {
  if (model) {
    if (target) {
      return await model.destroy(target);
    } else {
      return null;
    }
  } else {
    throw new Error("Not Provided : Model Missing");
  }
};

module.exports = {
  findAll,
  findOne,
  findByPk,
  create,
  update,
  destroy,
};
