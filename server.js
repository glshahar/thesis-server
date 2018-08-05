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

// Get All Walla Post
app.get('/getPostsWalla', db.getPostsWalla);

// Get All Maariv Post
app.get('/getPostsMaariv', db.getPostsMaariv);

// Get All Maariv Post
app.get('/getPostsHaaretz', db.getPostsHaaretz);

// Get All Ynet Post
app.get('/getPostsYnet', db.getPostsYnet);

// Get All Inn Post
app.get('/getPostsInn', db.getPostsInn);



app.listen(port);
console.log("app listening on port " + port);