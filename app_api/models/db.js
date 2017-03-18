var mongoose = require( 'mongoose' );
var dbURI = 'mongodb://localhost/Loc8r';
if(process.env.NODE_ENV === 'production') {
    dbURI = 'mongodb://fanpu:herokudb@ds121190.mlab.com:21190/heroku_1pq86whw'; ///*process.env.MONGOLAB_URI;*/
}
mongoose.connect(dbURI);

mongoose.connection.on('connected', function () {
    console.log('Mongoose connected to ' + dbURI);
});

mongoose.connection.on('error', function (err) {
    console.log('Mongoose connetion error: ' + err);
});

mongoose.connection.on('disconnected', function () {
    console.log('Mongoose disconnected');
})

var gracefulShutdown = function (msg, callback) {
    mongoose.connection.close(function () {
	console.log('Mongoose disconnected through ' + msg);
	callback();
    });
};

process.once('SIGUSR2', function () {
    gracefulShutdown('nodemon restart', function () {
	process.kill(process.pid, 'SIGUSR2');
    });
});


process.on('SIGINT', function () {
    gracefulShutdown('app termination', function () {
	process.exit(0);
    });
});

process.on('SIGTERM', function() {
    gracefulShutdown('Heroku app shutdown', function () {
	process.exit(0);
    });
});

require('./locations');
require('./users');
