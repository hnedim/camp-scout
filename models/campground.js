const mongoose = require('mongoose');
const Review = require('../models/review');

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp')

const Schema = mongoose.Schema;

const campgroundSchema = Schema({
    title: String,
    price: String,
    image: String,
    description: String,
    location: String,
    reviews: [{
        type: mongoose.Schema.ObjectId, ref: 'Review'
    }],
    author: {type: mongoose.Schema.ObjectId, ref: 'User'}
})

campgroundSchema.post('findOneAndDelete', async function (doc){
    if(doc){
        await Review.deleteMany({
            _id: {$in: doc.reviews}
        })
    }
})

const Campground = mongoose.model('Campground', campgroundSchema);

module.exports = Campground;