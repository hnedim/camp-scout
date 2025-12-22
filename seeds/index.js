const Campground = require('../models/campground');
const cities = require('./cities');
const seedHelpers = require('./seedHelpers');
const mongoose = require('mongoose');
const {descriptors, places} = seedHelpers;

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp')
.then(() => console.log("DB connected"))
.catch((e) => {
    console.log('DB connection failed', e)
}
)

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 10; i++){
        const random1000 = Math.floor(Math.random() * 1000);
        const camp = new Campground({
            title: `${sample(descriptors)} ${sample(places)}`, 
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images:  [
                {
                    url: 'https://res.cloudinary.com/ddnvjdoen/image/upload/v1766317164/camping-site-5166682_a0asgj.webp',
                    filename: 'CampScout/camping-site-5166682_a0asgj'
                }
            ],
            price: `${Math.floor(Math.random() * 50)}`,
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias similique accusamus animi praesentium repellendus incidunt quo veniam quisquam, explicabo beatae delectus! At cum magni quia dolorum perferendis quisquam id nulla!",
            author: "69455835bf1d2fca1b3604bf"
            
        });
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})