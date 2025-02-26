const createError = require("http-errors");
const Castle = require("../models/castles.model");
const Review = require ("../models/reviews.model");

module.exports.list = (req, res, next) => {
    Castle.find()
        .then((castles) => res.json(castles))
        .catch((err) => next(err));
};

module.exports.detail = (req, res, next) => {
    const { id } = req.params;

    Castle.findById(id)
        .then((castle) => {
            if (!castle) next(createError(404, "Castle not found"));
            else res.json(castle);
        })
        .catch((err) => next(err))
};

module.exports.create = (req, res, next) => {
    const castle = req.body;
    castle.user = req.session.userId;
    
    if(castle.address?.location) {
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
    if(!castle) next(createError (404, "Castle not found"));
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

    Castle.findByIdAndUpdate(id, body, {runValidators: true, new: true})
    .then((castle) => {
        if(!castle) next(this.createError(404, "Castle not found"));
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

    Review.findByIdAndUpdate(id, body, {runValidators: true, new: true})
    .then((review) => {
        if(!review) next(this.createError(404, "Review not found"));
        else res.status(201).json(review);
    })
    .catch(error => next(error))
}