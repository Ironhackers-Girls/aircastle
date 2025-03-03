const mongoose = require("mongoose");

const schema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5
        },
        text: {
            type: String,
            required: true
        },
        castle: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Castle",
            required: true
        },
        user : {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    },
    {
        timestamps: true,
        toJSON: {
            transform: function (doc, ret) {
                delete ret.__v;
                delete ret._id;
                ret.id = doc.id;
                return ret;
            },
        },
    }
);

const Review = mongoose.model("Review", schema);

module.exports = Review;