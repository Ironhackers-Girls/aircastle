const createError = require("http-errors");
const Castle = require("../models/castles.model");
const Booking = require("../models/bookings.model");
const dayjs = require("dayjs");
const Review = require("../models/reviews.model");

module.exports.list = async (req, res, next) => {
    const { city,
        idHost,
        capacity,
        priceMin,
        priceMax,
        rooms,
        bathrooms,
        amenities,
        services
    } = req.query;

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
        if (idHost) criterial.user = idHost;

        Castle.find(criterial)
        .populate("user")
        .then((castles) => {
            if (!castles || castles.length === 0) {
                return res.status(204).send();
            }
            res.json(castles);  
        })
        .catch((error) => next(error)); 
    
};

module.exports.detail = async (req, res, next) => {
    let { id, checkIn, checkOut } = req.params;

    if (!checkIn) checkIn = dayjs().add(1, 'day').toISOString();
    if (!checkOut) checkOut = dayjs().add(2, 'day').toISOString();

    try {
        const castle = await Castle.findById(id).populate('user')

        if (!castle) next(createError(404, "Castle not found"));

        const bookingsOfCastle = await Booking.find({
            castle: id,
            checkIn: { $lte: new Date(checkOut) },
            checkOut: { $gte: new Date(checkIn) }
        });

        const available = bookingsOfCastle.length === 0;

        const reviewsArray = await Review.find({ castle : id});

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
                avatar: castle.user.avatar
            },
            reviews: reviewsArray,
            images: castle.images,
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
        .catch((error) => next(error))
};


