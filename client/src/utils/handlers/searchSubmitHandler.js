/**
 * @file searchSubmitHandler.js
 * @description Handle search bar submission
 */

/**
 * @function searchSubmitHandler
 * @param {SubmitEvent} event
 * @param {String} value
 * @param {Function} navigate - useNavigate()
 * @returns {void}
 * @description Handle search bar submission
 */
export default function searchSubmitHandler(event, value, navigate) {
  event.preventDefault();

  if (value !== null && value !== undefined && value.trim() !== "") {
    navigate(`/results?search=${value.trim()}`);
  }
}
