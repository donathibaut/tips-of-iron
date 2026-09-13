/**
 * @file togglerLink.js
 * @description Close hidden menu
 */

/**
 * @function togglerLink
 * @returns {void}
 * @description Close hidden menu IF clicked
 */
export default function togglerLink() {
  const menu = document.getElementById("menuToggleExternalContent");
  const toggleBtn = document.getElementById("hidden-menu-toggler");

  if (menu) {
    menu.classList.remove("show");
    toggleBtn.setAttribute("aria-expanded", "false");
  }
}
