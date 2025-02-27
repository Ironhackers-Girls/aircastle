const createError = require("http-errors");
const Castle = require("../models/castles.model");
const Review = require("../models/reviews.model");
const Booking = require("../models/bookings.model");
const dayjs = require("dayjs");

module.exports.list = async (req, res, next) => {
    const { city,
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
        if (city) criterial['address.city'] = city;
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

module.exports.detail = async (req, res, next) => {
    let { id, checkIn, checkOut } = req.params;

    if (!checkIn) checkIn = dayjs().toISOString();
    if (!checkOut) checkOut = dayjs().add(1, 'day').toISOString();

    try {
        const castle = await Castle.findById(id).populate('user')

        if (!castle) next(createError(404, "Castle not found"));

        const bookingsOfCastle = await Booking.find({
            castle: id,
            checkIn: { $lte: new Date(checkOut) },
            checkOut: { $gte: new Date(checkIn) }
        });

        const available = bookingsOfCastle.length === 0;

        res.json({
            _id: castle._id,
            title: castle.title,
            description: castle.description,
            address: castle.address,
            capacity: castle.capacity,
            pricePerNight: castle.pricePerNight,
            rooms: castle.rooms,
            bathrooms: castle.bathrooms,
            amenities: castle.amenities,
            services: castle.services,
            user: {
                username: castle.user.username,
                name: castle.user.name,
                email: castle.user.email,
                phone: castle.user.phone
            },
            available: available,
            checkIn: checkIn,
            checkOut: checkOut
        });
    } catch (error) {
        next(error);
    }
};

module.exports.create = (req, res, next) => {
    const castle = req.body;
    castle.user = req.session.userId;

    if (castle.address?.location) {
        const { lat, lng } = castle.address.location || {};
        castle.address.location = {
            type: 'Point',
            coordinates: [lng, lat]
        }
    }

    Castle.create(castle)
        .then((castle) => res.status(201).json(castle))
        .catch((err) => next(err));
};


module.exports.delete = (req, res, next) => {
    const { id } = req.params;

    Castle.findByIdAndDelete(id)
        .then((castle) => {
            if (!castle) next(createError(404, "Castle not found"));
            else res.status(204).send();
        })
        .catch((error) => next(error))
}


module.exports.update = (req, res, next) => {
    const { id } = req.params;
    const { body } = req;

    const permittedParams = ["title", "description", "address", "capacity", "pricePerNight", "rooms", "bathrooms", "amenities", "services"];
    Object.keys(body).forEach((key) => {
        if (!permittedParams.includes(key)) delete body[key];
    })

    Castle.findByIdAndUpdate(id, body, { runValidators: true, new: true })
        .then((castle) => {
            if (!castle) next(this.createError(404, "Castle not found"));
            else res.status(201).json(castle);
        })
        .catch(error => next(error))
};

module.exports.createReview = (req, res, next) => {
    Review.create({
        title: req.body.title,
        rating: req.body.rating,
        text: req.body.text,
        user: req.user.id,
        castle: req.params.id,
    })
        .then((review) => res.status(201).json(review))
        .catch((error) => next(error));
};

module.exports.listReviews = (req, res, next) => {
    Review.find(req.params.reviewId)
        .populate("user")
        .populate("castle")
        .then((review) => res.json(review))
        .catch((error) => next(error));
}


module.exports.updateReview = (req, res, next) => {
    const { id } = req.params;
    const { body } = req;

    const permittedParams = ["title", "rating", "text"];
    Object.keys(body).forEach((key) => {
        if (!permittedParams.includes(key)) delete body[key];
    })

    Review.findByIdAndUpdate(id, body, { runValidators: true, new: true })
        .then((review) => {
            if (!review) next(this.createError(404, "Review not found"));
            else res.status(201).json(review);
        })
        .catch(error => next(error))
}