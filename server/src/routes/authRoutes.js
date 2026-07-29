/**
 * @file authRoutes.js
 * @description Authentification Routes
 */
const express = require("express");
const router = express.Router();

// Controller import
const authController = require("../controllers/authController");

// Controller call
router.post("/", authController.auth);

module.exports = router;
