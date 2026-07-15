/**
 * @file categoryRoutes.js
 * @description Routes about Category data
 */
const express = require("express");
const router = express.Router();

// Controller import
const categoryController = require("../controllers/categoryController");

// Controller call
router.get("/", categoryController /*.fonction */);

module.exports = router;
