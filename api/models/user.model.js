const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const SALT_WORK_FACTOR = 10;
const EMAIL_PATTERN = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_PATTERN = /^.{8,}$/;
const PHONE_PATTERN = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
const USERNAME_PATTERN = /^[a-z0-9_]+$/;

const userSchema = new mongoose.Schema(
    {
        role: {
            type: String,
            enum: ['guest', 'host'],
            required: [true, "Role is required"]
        },
        username: {
            type: String,
            required : [true, "Username is required"],
            unique: true,
            lowercase: true,
            maxLength: [30, "Name characters must be lower than 30"],
            trim: true,
            match: [USERNAME_PATTERN, "Username can only contain letters, numbers, and underscores, with no spaces"]
        },
        name: {
            type: String,
            required : [true, "Name is required"],
            maxLength: [30, "Name characters must be lower than 30"],
            trim: true,
        },
        email: {
            type: String,
            trim: true,
            lowercase: true,
            unique: true,
            required: [true, "Email is required"],
            match: [EMAIL_PATTERN, "Invalid email pattern"]
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            match: [PASSWORD_PATTERN, "Invalid password pattern"]
        },
        phone: {
            type: String,
            trim: true,
            required: [true, "Phone is requiered"],
            match: [PHONE_PATTERN, "invalid phone pattern"]
        }
    },
    {
        timestamps: true,
        toJSON: {
            transform: function (doc, ret) {
                delete ret.__v;
                delete ret._id;
                delete ret.password;
                delete ret.phone;
                delete ret.email;

                ret.id = doc.id;
                return ret;
            },
        },
    }
);


userSchema.pre("save", function (next) {
    if(this.isModified("password")) {
        bcrypt
        .hash(this.password, SALT_WORK_FACTOR)
        .then((hash) => {
            this.password = hash;
            next();
        })
        .catch((error) => next(error))
    } else {
        next();
    }
});

userSchema.methods.checkPassword = function (passwordToCheck) {
    return bcrypt.compare(passwordToCheck, this.password)
}
const User = mongoose.model("User", userSchema);
module.exports = User;