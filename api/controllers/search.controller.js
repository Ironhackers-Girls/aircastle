const Castle = require("../models/castles.model");
const Booking = require("../models/bookings.model");

module.exports.list = async (req, res, next) => {
    const { country,
        checkIn,
        checkOut,
        capacity,
        priceMin,
        priceMax,
        rooms,
        bathrooms,
        amenities,
        services
    } = req.query;

    try {

        let castlesReserved = [];

        if (checkIn || checkOut) {

            const bookedCastles = await Booking.find({
                checkIn: { $lte: new Date(checkOut) },
                checkOut: { $gte: new Date(checkIn) }
            }).populate('castle');

            castlesReserved = bookedCastles.map((booking) => (booking.castle.id.toString()));
        }

        const criterial = {};
        if (country) criterial['address.country'] = country;
        if (capacity) criterial.capacity = { $gte: capacity };
        if (rooms) criterial.rooms = { $gte: rooms };
        if (bathrooms) criterial.bathrooms = { $gte: bathrooms };
        if (services) criterial.services = { $in: services.split(",") };
        if (priceMax || priceMin) {
            criterial.price = {};
            if (priceMin) criterial.price.$gte = priceMin;
            if (priceMax) criterial.price.$lte = priceMax;
        }
        if (amenities) criterial.amenities = { $in: amenities.split(",") };

        

        const availableCastles = await Castle.find({
            ...criterial,
            _id: { $nin: castlesReserved }
        });

        res.json(availableCastles);

    } catch (error) {
        next(error);
    };
};

