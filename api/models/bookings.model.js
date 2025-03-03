const mongoose = require("mongoose");
const dayjs = require("../config/dayjs.config");

const bookingSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        castle: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Castle"
        },
        checkIn: {
            type: Date,
            require: [true, "CheckIn date is required"],
            validate: {
                validator: function(checkIn) {
                    return dayjs(checkIn).isAfter(dayjs());
                },
                message: function () {
                    return "CheckIn date can not be in the past"
                }
            }
        },
        checkOut: {
            type: Date,
            required: [true, "ChechOut is required"],
            validate: {
                validator: function (checkOut) {
                    return dayjs(checkOut).isAfter(dayjs(this.checkIn));
                },
                message: function () {
                    return "CheckIn date can not be in the past";
                },
            },
        },
        totalPrice: {
            type: Number,
            required: [true, "Total Price is required"]
        },
        review: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Review"
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
        }
    }
)

const Booking = mongoose.model("Booking", bookingSchema);
module.exports = Booking;