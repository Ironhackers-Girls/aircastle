const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const createError = require("http-errors");
const users = require("../controllers/users.controller");
const auth = require("../middlewares/session.middleware");
const sessions = require("../controllers/sessions.controller");
const castles = require("../controllers/castles.controller");
const bookings = require("../controllers/bookings.controller");
const search = require("../controllers/search.controller");

router.get("/users/:username", auth.userIsLoggedIn, users.profile);
router.post("/users", users.create);
router.patch("/users/myprofile", auth.isAuthenticated, users.update);


router.get("/castles", castles.list);
router.get("/castles/:id", castles.detail);
router.post("/castles", auth.isAuthenticated, auth.isHost, castles.create);
router.patch("/castles/:id", auth.isAuthenticated, auth.isHost, auth.isYourCastle, castles.update);
router.delete("/castles/:id",auth.isAuthenticated, auth.isHost, auth.isYourCastle, castles.delete);


router.get("/search", search.list)


router.get("/bookings", auth.isAuthenticated, bookings.list);
router.get("/bookings/:id", auth.isAuthenticated, auth.isYourBooking, bookings.detail);
router.post("/bookings", auth.isAuthenticated, auth.isGuest, bookings.create);
router.delete("/bookings/:id", auth.isAuthenticated, auth.isGuest, auth.isYourBooking, bookings.delete);

router.post("/bookings/:id/reviews", auth.isAuthenticated, auth.isGuest, auth.haveReview, bookings.createReview);

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