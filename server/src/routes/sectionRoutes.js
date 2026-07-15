/**
 * @file sectionRoutes.js
 * @description Routes about Section data
 */
const express = require("express");
const router = express.Router();

// Controller import
const sectionController = require("../controllers/sectionController");

// Controller call
router.get("/", sectionController /*.fonction */);

module.exports = router;
