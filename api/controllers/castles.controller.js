const createError = require("http-errors");
const Castle = require("../models/castles.model");

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