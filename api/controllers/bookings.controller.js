const createError = require("http-errors");
const Booking = require("../models/bookings.model");

module.exports.list = (req,res, next) => {
    const userId = req.session.userId;

    Booking.find({ user: userId}) 
        .populate("castle")
        .then((bookings) => res.json(bookings))
        .catch((error) => next(error) )
    
}

module.exports.create = (req, res, next) => {
    const booking = req.body;
    booking.user = req.session.userId;

    Booking.create(booking)
        .then((booking) => res.status(201).json(booking))
        .catch((error) => next(error));
};


module.exports.detail = (req, res, next) => {
    const { id } = req.params;

    Booking.findById(id)
    .populate("castle")
    .populate("user")
    .then((booking) => {
        if(!booking) next(createError(404, "Booking not found"));
        else res.json(booking)
    })
    .catch((error) => next(error))
};

module.exports.delete = (req, res, next) => {
    const { id } = req.params;
    
    Booking.findByIdAndDelete(id)
        .then((booking) => {
            if(!booking) next(createError(404, "Castle not found"));
            else res.status(204).send();
        })
        .catch((error) => next(error))
};