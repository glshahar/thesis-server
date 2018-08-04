//------------Connect to mongodbon mLabvia Mongoose---------------//
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
config = {
	mongoUrl:'mongodb://db_usr:db_pass@ds023560.mlab.com:23560/grades_g'
};

var options = { server: { auto_reconnect:true, socketOptions: { keepAlive: 10000000, connectTimeoutMS: 1000000 } }, 
                replset: { auto_reconnect:true, socketOptions: { keepAlive: 10000000, connectTimeoutMS : 1000000 } } };  

mongoose.connect(config.mongoUrl, options);
db = mongoose.connection;

// Event handlers for Mongoose
db.on('error', function(err){
	console.log('Mongoose: Error:' +err);
});

db.on('open', function(err){
	console.log('Mongoose: Connection established');
});

db.on('disconnected', function(err){
	console.log('Mongoose: Connection stopped reconnect');
	mongoose.connect(config.mongoUrl, options);
});

db.on('reconnected', function(err){
	console.log('Mongoose: reconnected!');
});
