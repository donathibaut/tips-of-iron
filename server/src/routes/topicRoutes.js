/**
 * @file topicRoutes.js
 * @description Topic Routes
 */
const express = require("express");
const router = express.Router();

// Controller import
const topicController = require("../controllers/topicController");

// Middleware import
const authRoleMiddleware = require("../middlewares/authRoleMiddleware");

// Controller call
router.get("/user/:id_user", topicController.getTopicsByFK);
router.get("/category/:name", topicController.getTopicsByFK);
router.get("/search", topicController.getTopicsByQuery);
router.get("/:title", topicController.getTopic);
router.post("/", authRoleMiddleware([1, 2]), topicController.postTopic);
router.patch(
  "/:id_topic",
  authRoleMiddleware([1, 2]),
  topicController.patchTopic,
);
router.delete(
  "/:id_topic",
  authRoleMiddleware([1, 2]),
  topicController.deleteTopic,
);

module.exports = router;
