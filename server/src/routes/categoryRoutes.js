/**
 * @file categoryRoutes.js
 * @description Category Routes
 */
const express = require("express");
const router = express.Router();

// Controller import
const categoryController = require("../controllers/categoryController");

// Controller call
router.get("/", categoryController.getCategories);

module.exports = router;
