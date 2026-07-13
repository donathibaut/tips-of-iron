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

app.use(cors(corsSettings));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes

// middlewares

module.exports = app;
