const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const createError = require("http-errors");
const users = require("../controllers/users.controller");
const auth = require("../middlewares/session.middleware");
const sessions = require("../controllers/sessions.controller")

router.post("/users", users.create);
router.patch("/users/:id", auth.isAuthenticated, users.update);
router.get("/users/:username", users.profile);

router.post("/sessions", sessions.create);
router.delete("/sessions", auth.isAuthenticated, sessions.destroy);

router.use((req, res, next) => {
    next(createError(404, "Route not found"));
});

router.use((error, req, res, next) => {
    if (error instanceof mongoose.Error.ValidationError)
      error = createError(400, error);
    else if (!error.status) error = createError(500, error.message);
    console.error(error);
  
    const data = {};
    data.message = error.message;
    if (error.errors) {
      data.errors = Object.keys(error.errors).reduce((errors, errorKey) => {
        errors[errorKey] =
          error.errors[errorKey]?.message || error.errors[errorKey];
        return errors;
      }, {});
    }
    res.status(error.status).json(data);
  });

module.exports = router;