const mongoose = require("mongoose");

const schema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        rating: {
            type: Number,
            required: true
        },
        text: {
            type: String,
            required: true
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        castle: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Castle"
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

const Reviews = mongoose.model("Reviews", schema);

module.exports = Reviews;