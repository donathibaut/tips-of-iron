/**
 * @file addSectionFromTopic.js
 * @description Add Section from Topic
 */

/**
 * @async
 * @function addSectionFromTopic
 * @description Add Section from Topic
 * @param {Array} topicSections - sections from the topic
 * @param {Function} setSections - set sections
 * @param {Function} setError - set error message
 * @returns {Promise<void>} null
 */
export default function addSectionFromTopic(
  topicSections,
  setSections,
  setError,
) {
  // reset message
  setError(null);

  try {
    const addSections = topicSections.map((object, index) => {
      return {
        // fieldID -> id_section is more reliable than Date.now()
        fieldID: object.id_section,
        title: object.title,
        image_path: object.image_path,
        text: object.text,
        // Dynamic Update of list_nb
        list_nb: index + 1,
      };
    });
    setSections(addSections);
  } catch (e) {
    console.log("Add Section Error:", e);
    setError(e.message);
  }
}
