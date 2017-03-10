var request = require('request');
var apiOptions = {
    server : "http://localhost:3000"
};
if (process.env.NODE_ENV === 'production') {
    apiOptions.server = "https://cafe-loc8r.herokuapp.com";
}

module.exports.homelist = function(req, res) {
    var requestOptions, path;
    path = '/api/locations';
    requestOptions = {
	url : apiOptions.server + path,
	method : "GET",
	json : {},
	qs : {
	    lng : 103.811363,
	    lat : 1.325288,
	    maxdist : 1000000000
	}
    };
    request(
	requestOptions,
	function(err, response, body) {
	    var i, data;
	    data = body;
	    if (response.statusCode === 200 && data.length) {
		for (i = 0; i < data.length; i++) {
		    data[i].distance = _formatDistance(data[i].distance);
		}
	    }
	    renderHomepage(req, res, data);
		
	}
    );
};

module.exports.locationInfo = function(req, res) {
    var requestOptions, path;
    path = "/api/locations/" + req.params.locationid;
    requestOptions = {
	url : apiOptions.server + path,
	method : "GET",
	json : {}
    };
    request(
	requestOptions,
	function(err, response, body) {
	    var data = body;
	    if (response.statusCode === 200) {
		data.coords = {
		    lng : body.coords[0],
		    lat : body.coords[1]
		};
		renderDetailPage(req, res, data);
	    }
	}
    );
};

module.exports.addReview = function(req, res) {
    res.render('location-review-form', {
	title: 'Review Starcups on Loc8r',
	pageHeader: { title: 'Review Starcups'}
    });
};

var renderHomepage = function(req, res, responseBody) {
    var message;
    if (!(responseBody instanceof Array)) {
	message = "API lookup error";
	responseBody = [];
    } else {
	if (!responseBody.length) {
	    message = "No places found nearby";
	}
    }
    res.render('locations-list', {
	title: 'Loc8r - find a place to work with wifi',
        pageHeader: {
	    title: 'Loc8r',
	    strapline: 'Find places to work with wifi near you!'
	},
	sidebar: "Looking for wifi and a seat? Loc8r helps you find places to work when out and about. perhaps with coffee, cake or a pint? Let Loc8r help you find the place you're looking for.",
	locations: responseBody,
	message: message
    });
};

var renderDetailPage = function (req, res, locDetail) {
    console.log("PRAISE KEK");
    console.log(locDetail);
    res.render('location-info', {
	title: locDetail.name,
	pageHeader: {title: locDetail.name},
	sidebar: {
	    context: 'is on Loc8r because it has accessible wifi and space to sit down with your laptop and get some work done.',
	    callToAction: "If you've been and you like it - or if you don't - please leave a review to help other people just like you."
	},
	location: locDetail
    });
}

var _formatDistance = function (distance) {
    var numDistance, unit, modifier = 1000000;
    distance /= modifier;
    if (distance > 1) {
	numDistance = parseFloat(distance).toFixed(1);
	unit = 'km';
    } else {
	numDistance = parseInt(distance * 1000, 10);
	unit = 'm';
    }
    return numDistance + unit;
};
