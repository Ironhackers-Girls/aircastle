const mongoose = require("mongoose");

const castleSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Title is required"],
            trim: true,
            minLength: [3, "Title needs at least 3 characters"],
            maxLength: [100, "Title characters must be lower than 100"]
        },
        description: {
            type: String,
            required: [true, "Description is required"],
            trim: true,
            minLength: [10, "Description needs at least 3 characters"],
            maxLength: [7000, "Description characters must be lower than 7000"]
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        address: {
            type: {
                _id: false,
                city: {
                    type: String,
                    lowercase: true,
                    required: [true, "City is required giving an address"],
                },
                street: {
                    type: String,
                    required: [true, "Street is required giving an address"],
                },
                location: {
                    type: {
                        type: String,
                        enum: ['Point'],
                        required: true
                    },
                    coordinates: {
                        type: [Number],
                        required: true
                    }
                }
            },
            required: [true, "Address is required"]
        },
        capacity: {
            type: Number,
            required: [true, "Capacity is required"]
        },
        pricePerNight: {
            type: Number,
            required: [true, "Price is required"]
        },
        rooms: {
            type: Number,
            required: [true, "Rooms is required"]
        },
        bathrooms: {
            type: Number,
            required: [true, "Bathroom is required"]
        },
        amenities: [String],
        services: [String],
        reviews: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Review"
        }]
    },
    {
        timestamps: true,
        toJSON: {
            transform: function (doc, ret) {
                delete ret.__v;
                delete ret._id;
                ret.id = doc.id;
                if (ret.address) {
                    const [lng, lat] = ret.address.location.coordinates;
                    ret.address.location = { lat, lng }
                }
                return ret;
            }
        }
    }
)

const Castle = mongoose.model("Castle", castleSchema);
module.exports = Castle;