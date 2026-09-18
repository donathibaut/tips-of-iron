/**
 * @file scrollList.js
 * @description Scroll function for list buttons
 */

/**
 * @function scrollList
 * @param {String} listClass - (-> ".class")
 * @param {Number} direction - left = -1, right = 1
 * @returns {void}
 * @description Scroll function for list buttons
 */
export default function scrollList(listClass, direction) {
  const list = document.querySelector(listClass);
  const scollPx = 300;
  list.scrollBy({
    left: direction * scollPx,
    behavior: "smooth",
  });
}
