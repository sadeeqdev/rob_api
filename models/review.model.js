const { model, Schema } = require("mongoose");

const reviewSchema = new Schema({
    name: { type: String, },
    title: { type: String, },
    message: { type: String, },
    rating: { type: Number },
}, { timestamps: true });

module.exports = model("Review", reviewSchema);
