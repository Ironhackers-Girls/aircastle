const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const createError = require("http-errors");

router.use((req, res, next) => {
    next(createError(404, "Route not found"));
});

module.exports = router;