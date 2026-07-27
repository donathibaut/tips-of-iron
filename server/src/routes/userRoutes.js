/**
 * @file userRoutes.js
 * @description User Routes
 */
const express = require("express");
const router = express.Router();

// Controller import
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

// Controller call
router.get("/users/:id", userController.getUserById);
router.post("/users", userController.postUser);
router.patch("/users/:id", authMiddleware, userController.patchUser);
router.delete("/users/:id", authMiddleware, userController.deleteUser);

module.exports = router;
