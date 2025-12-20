const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp')

const reviewSchema = mongoose.Schema({
    body: String,
    rating: Number,
    author: {type: mongoose.Schema.ObjectId, ref: 'User'}
})

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;