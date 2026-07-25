/**
 * @file userRoutes.js
 * @description User Routes
 */
const express = require("express");
const router = express.Router();

// Controller import
const userController = require("../controllers/userController");

// Controller call
router.get("/", userController /*.fonction */);

module.exports = router;
