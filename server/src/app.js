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
  methods: "GET,POST",
  optionsSuccessStatus: 200,
};

const userRoutes = require("./routes/userRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const sectionRoutes = require("./routes/sectionRoutes");
const topicRoutes = require("./routes/topicRoutes");

app.use(cors(corsSettings));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use("/api/user", userRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/section", sectionRoutes);
app.use("/api/topic", topicRoutes);

// middlewares

module.exports = app;
