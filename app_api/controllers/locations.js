var mongoose = require('mongoose');
var Loc = mongoose.model('Location');
var helper = require('./common');
module.exports.locationsListByDistance = function (req, res) {};
module.exports.locationsCreate = function (req, res) {
    helper.sendJsonResponse(res, 200, {"status" : "success"});
};
module.exports.locationsReadOne = function (req, res) {};
module.exports.locationsUpdateOne = function (req, res) {};
module.exports.locationsDeleteOne = function (req, res) {};
