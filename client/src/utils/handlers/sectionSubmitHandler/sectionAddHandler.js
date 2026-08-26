/**
 * @file sectionAddHandler.js
 * @description Handle Add Section
 */

/**
 * @async
 * @function sectionAddHandler
 * @description Handle Add Section in Form
 * @param {Event} event - button click
 * @param {Object} setSections - set sections
 * @param {String} setError - set error message
 * @returns {Promise<void>} null
 */
export default async function sectionAddHandler(event, setSections, setError) {
  // reset message
  setError(null);

  // PREVENT page refresh on form submission
  event.preventDefault();

  try {
    const defaultTitle = "";
    const defaultImage_path = "";
    const defaultText = "";
    const defaultListNb = 0;

    // Add a new section object with setSections
    setSections((section) => [
      ...section,
      {
        // fieldID -> fixed value for sections management in the form
        fieldID: Date.now(),
        title: defaultTitle,
        image_path: defaultImage_path,
        text: defaultText,
        list_nb: defaultListNb,
      },
    ]);
  } catch (e) {
    console.log("Add Section Error:", e);
    setError(e.message);
  }
}
