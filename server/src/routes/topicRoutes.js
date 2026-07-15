/**
 * @file topicRoutes.js
 * @description Routes about Topic data
 */
const express = require("express");
const router = express.Router();

// Controller import
const topicController = require("../controllers/topicController");

// Controller call
router.get("/", topicController /*.fonction */);

module.exports = router;
