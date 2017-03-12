var mongoose = require( 'mongoose' );

var openingTimeSchema = new mongoose.Schema({
    days: {type: String, required: true},
    opening: String,
    closinvg: String,
    closed: {type: Boolean, required: true}
});

var reviewSchema = new mongoose.Schema({
    author: {type: String, required: true},
    rating: {type: Number, required: true, min: 0, max: 5},
    reviewText: {type: String, required: true},
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
	    _id: ObjectId(),
	    rating: 1,
	    timestamp: new Date("March 4, 2017"),
	    reviewText: "Expensive brown water for white girls"
	}
    }
})

db.locations.update({
    name: 'Starbucks',
    }, 
    {
    $push: {
	reviews: {
			"author" : "Tony Tan",
			"rating" : 1,
			"timestamp" : ISODate("2017-03-02T16:00:00Z"),
			"reviewText" : "Needs more fried chicken wings."
	}
    }
})



	{
			"author" : "Dr Hon",
			"id" : ObjectId("58be281dd4bfa371e8d81f9b"),
			"rating" : 5,
			"timestamp" : ISODate("2017-03-05T16:00:00Z"),
			"reviewText" : "What a great place, full of cute Hwachong girls. I can't say enough good things about it."
		},
		{
			"author" : "Tony Tan",
			"id" : ObjectId("58be2849d4bfa371e8d81f9c"),
			"rating" : 1,
			"timestamp" : ISODate("2017-03-02T16:00:00Z"),
			"reviewText" : "Needs more fried chicken wings."
		},
		{
			"author" : "Xiaodong",
			"id" : ObjectId("58be2870d4bfa371e8d81f9d"),
			"rating" : 1,
			"timestamp" : ISODate("2017-03-03T16:00:00Z"),
			"reviewText" : "Expensive brown water for white girls"
		},
		{
			"author" : "Xiaodong",
			"_id" : ObjectId("58bfbd9169f4a14d2666a704"),
			"rating" : 1,
			"timestamp" : ISODate("2017-03-03T16:00:00Z"),
			"reviewText" : "Expensive brown water for white girls"
		}



mongorestore -h ds121190.mlab.com:21190 -d heroku_1pq86whw -u fanpu -p herokudb tmp/mongodump/Loc8r

mongo ds121190.mlab.com:21190/heroku_1pq86whw -u fanpu -p herokudb
*/
