/**
 * @file sectionRoutes.js
 * @description Section Routes
 */
const express = require("express");
const router = express.Router();

// Controller import
const sectionController = require("../controllers/sectionController");

// Middleware import
const authMiddleware = require("../middlewares/authMiddleware");

// Controller call
router.get("/:id_section", sectionController.getSectionById);
router.post("/", sectionController.postSection);
router.patch("/:id_section", authMiddleware, sectionController.patchSection);
router.delete("/:id_section", authMiddleware, sectionController.deleteSection);

module.exports = router;
