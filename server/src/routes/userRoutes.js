/**
 * @file userRoutes.js
 * @description User Routes
 */
const express = require("express");
const router = express.Router();

// Controller import
const userController = require("../controllers/userController");

// Middleware import
const authMiddleware = require("../middlewares/authMiddleware");

// Controller call
router.get("/:id_user", userController.getUserById);
router.post("/", userController.postUser);
router.patch("/:id_user", authMiddleware, userController.patchUser);
router.delete("/:id_user", authMiddleware, userController.deleteUser);

module.exports = router;
