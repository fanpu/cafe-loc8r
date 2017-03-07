var mongoose = require( 'mongoose' );

var openingTimeSchema = new mongoose.Schema({
    days: {type: String, required: true},
    opening: String,
    closinvg: String,
    closed: {type: Boolean, required: true}
});

var reviewSchema = new mongoose.Schema({
    author: String,
    rating: {type: Number, required: true, min: 0, max: 5},
    reviewText: String,
    createdOn: {type: Date, "default": Date.now}
});

var locationSchema = new mongoose.Schema({
    name: {type: String, required: true},
    address: String,
    rating: {type: Number, "default": 0, min: 0, max: 5},
    facilities: [String],
    coords: {type: [Number], index: '2dsphere'},
    openingTimes: [openingTimeSchema],
    reviews: [reviewSchema]
});

mongoose.model('Location', locationSchema);


/*
db.locations.save({
    name: 'Taj Mahal Drink Stall',
    address: 'Adam Road Hawker Center',
    rating: 5,
    facilities: ['Teh Tarik', 'Ice Milo', 'Affordable brown water', 'Random birds'],
    coords: [103.814095, 1.323982],
    openingTimes: [{
	days: 'Monday - Sunday',
	opening: '7:00am',
	closing: '12:00am',
	closed: false
    }]
})

db.locations.update({
    name: 'Starbucks',
}, {
    $push: {
	reviews: {
	    author: 'Xiaodong',
	    id: ObjectId(),
	    rating: 1,
	    timestamp: new Date("March 4, 2017"),
	    reviewText: "Expensive brown water for white girls"
	}
    }
})


*/
