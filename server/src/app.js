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
  origin: "http://localhost:3000" || process.env.URL,
  methods: "GET,POST,PATCH,DELETE",
  optionsSuccessStatus: 200,
};

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const topicRoutes = require("./routes/topicRoutes");

app.use(cors(corsSettings));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use("/api/login", authRoutes); // auth
app.use("/api/user", userRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/topic", topicRoutes);

module.exports = app;
