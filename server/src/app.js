/**
 * @file app.js
 * @description Setting Express module
 */

const express = require("express");
const cors = require("cors");

/**
 * Express initialisation
 * @module app
 */
const app = express();

const corsSettings = {
  origin: process.env.URL || "http://localhost:3000",
  methods: ["GET", "POST", "PATCH", "DELETE"],
  optionsSuccessStatus: 200,
};

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const topicRoutes = require("./routes/topicRoutes");

app.use(cors(corsSettings));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/health", (req, res) => res.status(200).json({ status: "ok" }));

// routes
app.use("/api/login", authRoutes); // auth
app.use("/api/user", userRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/topic", topicRoutes);

module.exports = app;
