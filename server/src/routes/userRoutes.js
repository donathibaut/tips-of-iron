/**
 * @file userRoutes.js
 * @description Routes about User data
 */
const express = require("express");
const router = express.Router();

// Controller import
const userController = require("../controllers/userController");

// Controller call
router.get("/", userController /*.fonction */);

module.exports = router;
