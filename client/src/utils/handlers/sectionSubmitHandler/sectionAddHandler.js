/**
 * @file sectionAddHandler.js
 * @description Handle Add Section
 */

/**
 * @function sectionAddHandler
 * @description Handle Add Section in Form
 * @param {Event} event - button click
 * @param {Function} setSections - set sections
 * @param {Function} setError - set error message
 * @returns {Promise<void>} null
 */
export default function sectionAddHandler(event, setSections, setError) {
  // reset message
  setError(null);

  // PREVENT page refresh on form submission
  event.preventDefault();

  try {
    // Add a new section object with setSections
    setSections((section) => [
      ...section,
      {
        // fieldID -> fixed value for sections management in the form
        fieldID: Date.now(),
        title: "",
        image_path: "",
        text: "",
        // Dynamic Update of list_nb
        list_nb: section.length + 1,
      },
    ]);
  } catch (e) {
    console.log("Add Section Error:", e);
    setError(e.message);
  }
}
