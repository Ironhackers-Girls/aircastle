const createError = require("http-errors");
const User = require("../models/user.model");
const Review = require("../models/reviews.model");
const Castle = require("../models/castles.model");

module.exports.create = (req, res, next) => {
    const { email, username, role } = req.body;

    User.findOne({ email })
        .then((user) => {
            if (user) {
                if (user.username === username) {
                    next(createError(400, "Username already taken", { username: "Username exists" }));
                }

                if (user.email === email && user.role !== role) {
                    next(createError(400, "Can't register with another role.", { email: "Email exists" }));
                }

                if (user.email === email && user.role == role) {
                    next(createError(400, "Email already taken", { email: "Email exists" }));
                }

            } else {
                return User.create({
                    role: req.body.role,
                    email: req.body.email,
                    password: req.body.password,
                    name: req.body.name,
                    phone: req.body.phone,
                    username: req.body.username
                    

                }).then((user) => {
                    res.status(201).json(user);
                    
                }).catch((error) => next(error));
            }
        })
        .catch((error) => next(error));
};

module.exports.update = (req, res, next) => {
    const { username } = req.params; 

    const permittedBody = {
        email: req.body.email,
        password: req.body.password,
        username: req.body.username,
        name: req.body.name,
        phone: req.body.phone
    };

    Object.keys(permittedBody).forEach((key) => {
        if (permittedBody[key] === undefined) {
            delete permittedBody[key];
        }
    });

    Object.assign(req.user, permittedBody);

    req.user
        .save()
        .then((user) => res.json(user))
        .catch(next);
};

module.exports.profile = (req, res, next) => {
    const { username } = req.params; 

    User.findOne({ username })
    .then((user) => res.json(user))
    .catch(next); 
};

module.exports.myCastles = (req, res, next) => {
    const id = req.user.id;
    console.log(id);

    Castle.find( { user: id}) 
        .then((castles) => res.json(castles))
        .catch((error) => next(error))
}

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