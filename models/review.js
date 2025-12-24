const mongoose = require('mongoose');
const dbUrl = process.env.DB_URL;

mongoose.connect(dbUrl);

const reviewSchema = mongoose.Schema({
    body: String,
    rating: Number,
    author: {type: mongoose.Schema.ObjectId, ref: 'User'}
})

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;