const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 200; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price_ = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            // Your user Id
            author: "60deeb4c1a74f9161719c396",
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            images: [
                {
                    url: 'https://res.cloudinary.com/shampoo/image/upload/v1625485975/YelpCamp/sexaftuan9idyy3nts67.jpg',
                    filename: 'YelpCamp/sexaftuan9idyy3nts67'
                },
                {
                    url: 'https://res.cloudinary.com/shampoo/image/upload/v1625485983/YelpCamp/hrqmhtn6o3m0vl1cextp.jpg',
                    filename: 'YelpCamp/hrqmhtn6o3m0vl1cextp'
                }
            ],
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut nihil tempore placeat sequi. Expedita, rem beatae! Odit, velit inventore repudiandae numquam culpa quia maiores unde officia, eum repellat, iure excepturi.",
            price: `${price_}`,
            geometry: { type: 'Point', coordinates: [cities[random1000].longitude, cities[random1000].latitude] }

        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})