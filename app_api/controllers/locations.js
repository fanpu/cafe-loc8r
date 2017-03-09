var mongoose = require('mongoose');
var Loc = mongoose.model('Location');
var helper = require('./common');
module.exports.locationsListByDistance = function (req, res) {
    var lng = parseFloat(req.query.lng);
    var lat = parseFloat(req.query.lat);
    var maxDist = parseFloat(req.query.maxdist);
    var point = {
	type: "Point",
	coordinates: [lng, lat]
    };
    var theEarth = (function() {
	var earthRadius = 6371;

	var getDistanceFromRads = function(rads) {
	    return parseFloat(rads * earthRadius);
	};

	var getRadsFromDistance = function(distance) {
	    return parseFloat(distance / earthRadius);
	};

	return {
	    getDistanceFromRads: getDistanceFromRads,
	    getRadsFromDistance: getRadsFromDistance
	};
    })();
    if(!maxDist) maxDist = 20;
    var geoOptions = {
	spherical: true,
	maxDistance: theEarth.getRadsFromDistance(maxDist),
	num: 10
    };
    if (!lng || !lat) {
	helper.sendJsonResponse(res, 404, {
	    "message": "lng and lat query parameters are required"
	});
	return;
    }
    Loc.geoNear(point, geoOptions, function (err, results, stats) {
	var locations = [];
	if (err) {
	    helper.sendJsonResponse(res, 404, err);
	} else {
	    results.forEach(function(doc) {
		locations.push({
		    distance: theEarth.getDistanceFromRads(doc.dis),
		    name: doc.obj.name,
		    address: doc.obj.address,
		    rating: doc.obj.rating,
		    facilities: doc.obj.facilities,
		    _id: doc.obj._id
		});
	    });
	    helper.sendJsonResponse(res, 200, locations);
	}
    });
};

module.exports.locationsCreate = function (req, res) {
    console.log(req.body.name);
    console.log(req.body.address);
    console.log(req.body.openingTimes);

    Loc.create({
	name: req.body.name,
	address: req.body.address,
	facilities: req.body.facilities.split(","),
	coords: [parseFloat(req.body.lng), parseFloat(req.body.lat)],
	openingTimes: [{
	    days: req.body.days1,
	    opening: req.body.opening1,
	    closing: req.body.closing1,
	    closed: req.body.closed1,
	}, {
	    days: req.body.days2,
	    opening: req.body.opening2,
	    closing: req.body.closing2,
	    closed: req.body.closed2,
	}],
    }, function(err, location) {
	if (err) {
	    helper.sendJsonResponse(res, 400, err);
	} else {
	    helper.sendJsonResponse(res, 201, location);
	}
    });
};

module.exports.locationsReadOne = function (req, res) {
    if (req.params && req.params.locationid) {
	Loc
	    .findById(req.params.locationid)
	    .exec(function(err, location) {
		if (!location) {
		    helper.sendJsonResponse(res, 404, {
			"message": "locationid not found"
		    });
		    return;
		} else if (err) {
		    helper.sendJsonResponse(res, 404, err);
		    return;
		}
		helper.sendJsonResponse(res, 200, location);
	    });
    } else {
	helper.sendJsonResponse(res, 404, {
	    "message": "No locationid in request"
	});
    }
};
module.exports.locationsUpdateOne = function (req, res) {};
module.exports.locationsDeleteOne = function (req, res) {};
