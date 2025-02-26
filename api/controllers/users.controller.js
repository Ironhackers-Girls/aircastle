const createError = require("http-errors");
const User = require("../models/user.model");

module.exports.create = (req, res, next) => {
    const { email, username, role } = req.body;

    User.findOne({ email })
        .then((user) => {
            if (user) {
                if (user.username === username) {
                    next(createError(400, "Username already taken", { username: "Username exists" }));
                }

                if (user.email === email) {
                    next(createError(400, "Email already taken", { email: "Email exists" }));
                }

                if (user.role !== role) {
                    next(createError(400, "Can't register with another role.", { role: "Role mismatch" }));
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
        .then((user) => {
            if (!user) {
                return next(createError(404, "User not found"));
            }
            if(user.role === "guest") {
                return next(res.status(301).redirect('/login'))
            }
            const userResponse = {
                id: user.id,
                username: user.username,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            }
            res.json(userResponse); 
        })
        .catch(next); 
};