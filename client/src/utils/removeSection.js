/**
 * @file removeSection.js
 * @description Remove section fieldset
 */

/**
 * @function removeSection
 * @param {Event} event
 * @param {Array} sections - sections state
 * @param {Function} setSections - change sections state
 * @param {Function} setError - change error state
 * @param {Number} removeField - field ID to remove
 * @returns {void}
 * @description Remove section fieldset
 */
export default function removeSection(
  event,
  sections,
  setSections,
  setError,
  removeField,
) {
  // PREVENT page refresh on form submission
  event.preventDefault();

  try {
    setSections(sections.filter((object) => object.fieldID !== removeField));
  } catch (e) {
    console.log("Cancel Section Error:", e);
    setError(e.message);
  }
}
