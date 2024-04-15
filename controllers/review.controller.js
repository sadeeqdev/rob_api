const reviewModel = require("../models/review.model");


class ReviewController {
    constructor() {

    }
   
    async createReview(body) {
        try {
            const review = new reviewModel(body);
            let result = await review.save();
            return { ok: true, data: result };
        } catch (error) {
            return { ok: false, message: error.message };
        }
    }

    async getReviews() {
        try {
            let review = await reviewModel.find();
            return { ok: true, data: review };
        } catch (error) {
            return { ok: false, message: error.message };
        }
    }

   
}

module.exports = new ReviewController();
