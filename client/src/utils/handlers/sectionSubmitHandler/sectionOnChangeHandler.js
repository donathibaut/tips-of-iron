/**
 * @file sectionOnChangeHandler.js
 * @description Handle OnChange Section
 */

/**
 * @async
 * @function sectionOnChangeHandler
 * @description Handle OnChange Section in Form
 * @param {Array} sections - sections state
 * @param {Function} setSections - set sections update
 * @param {Number} fieldID - section field ID
 * @param {String} inputName
 * @param {String|Number} inputValue
 * @returns {Promise<void>} null
 */
export default function sectionOnChangeHandler(
  sections,
  setSections,
  fieldID,
  inputName,
  inputValue,
) {
  setSections(
    sections.map((element) => {
      if (element.fieldID === fieldID) {
        return { ...element, [inputName]: inputValue };
      }
      return element;
    }),
  );
}
