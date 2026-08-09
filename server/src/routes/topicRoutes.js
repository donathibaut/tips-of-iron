/**
 * @file topicRoutes.js
 * @description Topic Routes
 */
const express = require("express");
const router = express.Router();

// Controller import
const topicController = require("../controllers/topicController");

// Middleware import
const authMiddleware = require("../middlewares/authMiddleware");

// Controller call
router.get("/user/:id_user", topicController.getFKTopics);
router.get("/category/:id_category", topicController.getFKTopics);
router.get("/:title", topicController.getTopic);
router.post("/", authMiddleware, topicController.postTopic);
router.patch("/:id_topic", authMiddleware, topicController.patchTopic);
router.delete("/:id_topic", authMiddleware, topicController.deleteTopic);

module.exports = router;
