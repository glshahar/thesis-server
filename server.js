var express = require('express');
var app = express();
var schedule = require('node-schedule');
var bodyParser  = require('body-parser');
var db = require('./dbController');
var port = process.env.PORT || 3000;
var fs = require('fs');

/*** Server settings ***/
app.use('/', express.static('./public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(function(req, res, next){
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.set("Content-Type", "application/json");
	next();
});


/*** All routes ***/

app.post('/getAllPosts', db.getAllPosts);
app.post('/getPostByKeyword', db.getPostByKeyword);
app.get('/getPostsData', db.getPostsData);
app.get('/getPostsYnet', db.getPostsYnet);
app.get('/getPosts10', db.getPosts10);


app.listen(port);
console.log("app listening on port " + port);