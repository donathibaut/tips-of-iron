/**
 * @file basicService.js
 * @description basic functions for the Service files
 */

/**
 * @async
 * @function findAll
 * @param {object} model
 * @param {object} options - filters
 * @returns {Promise<Array|null>}
 * @description Find All data from the table || null
 */
const findAll = async (model, options = {}) => {
  if (model) {
    return await model.findAll(options);
  } else {
    throw new Error("Not Provided: Model Missing");
  }
};

/**
 * @async
 * @function findOne
 * @param {object} model
 * @param {object} options - filters
 * @returns {Promise<Object|null>}
 * @description Find One data from the table || null
 */
const findOne = async (model, options = {}) => {
  if (model) {
    if (options) {
      return await model.findOne(options);
    } else {
      return null;
    }
  } else {
    throw new Error("Not Provided: Model Missing");
  }
};

/**
 * @async
 * @function findByPk
 * @param {object} model
 * @param {number} id
 * @param {object} options - filters (default = {})
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
    throw new Error("Not Provided: Model Missing");
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
    throw new Error("Not Provided: Model Missing");
  }
};

/**
 * @async
 * @function update
 * @param {object} model
 * @param {object} form
 * @param {object} filter
 * @returns {Promise<Object|null>}
 * @description Update data in database || null
 */
const update = async (model, form, filter) => {
  if (model) {
    if (form) {
      if (filter) {
        return await model.update(form, filter);
      } else {
        return null;
      }
    } else {
      throw new Error("Invalid Form");
    }
  } else {
    throw new Error("Not Provided: Model Missing");
  }
};

/**
 * @async
 * @function destroy
 * @param {object} model
 * @param {object} id
 * @returns {Promise<Object|null>}
 * @description Delete data in database || null
 */
const destroy = async (model, id) => {
  if (model) {
    if (id) {
      return await model.destroy(id);
    } else {
      return null;
    }
  } else {
    throw new Error("Not Provided: Model Missing");
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
