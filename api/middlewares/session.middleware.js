const createError = require("http-errors");
const User = require("../models/user.model");
const Castle = require("../models/castles.model");
const Booking = require("../models/bookings.model");
const dayjs = require("../config/dayjs.config");

module.exports.loadSessionUser = (req, res, next) => {
  const { userId } = req.session;
  if (!userId) {
    req.user = undefined;
    next();
  } else {
    User.findById(userId)
      .then((user) => {
        req.user = user;
        next();
      })
      .catch((error) => next(error));
  }
}

module.exports.isAuthenticated = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    next(createError(401, 'Unauthorized, missing credentials'));
  }
}


module.exports.isYourCastle = (req, res, next) => {
  const { id } = req.params;

  Castle.findById(id)
    .then((castle) => {
      if (!castle) next(createError(404, "Castle not found"));
      if (castle.user.toString() !== req.user.id) next(createError(403, "You are not the owner!"));
      next();
    })
    .catch((error) => next(error))
}

module.exports.isYourBooking = (req, res, next) => {
  const { id } = req.params;
  const userId = req.session.userId;


  if (req.user.role === "guest") {
    Booking.find({ user: userId, _id: id })
      .then((booking) => {

        if (!booking || booking.length === 0) next(createError(404, "Booking not found"));
        else next()
      })
      .catch((error) => next(error))
  }

  if (req.user.role === "host") {
    Booking.findById(id)
      .then((booking) => {

        const castleId = booking.castle.toString();

        Castle.findById(castleId)
          .then((castle) => {
            if (castle.user.toString() === userId) {
              next()
            } else {
              next(createError(403, "Forbidden"));
            }
          })
          .catch((error) => next(error));
      })
      .catch((error) => next(error));
  }
}


module.exports.isHost = (req, res, next) => {
  if (req.user.role === "host") {
    next();
  } else {
    next(createError(403, "Forbidden, you are not a host!"))
  }
}

module.exports.isGuest = (req, res, next) => {
  if (req.user.role === "guest") {
    next()
  } else {
    next(createError(403, "Forbidden, you are not a guest!"))
  }
}

module.exports.haveReview = (req, res, next) => {
  const { id } = req.params;

  Booking.findById(id)
    .then((booking) => {
      if (!booking) next(createError(404, "Booking not found"));
      if (!booking.review) {
        if (dayjs(dayjs()).isAfter(booking.checkOut)) {
          req.castleId = booking.castle;
          next()
        } else {
          next(createError(403, "Booking is not finished"))
        }
      } else {
        next(createError(403, "Booking already has a review"))
      }
    })
    .catch((error) => next(error))
}