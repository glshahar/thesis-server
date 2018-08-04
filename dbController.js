// npm Initialize
var mongoose = require('mongoose');
var scrapy = require('node-scrapy');
var dateFormat = require('dateformat');
var async = require('async');
var fs = require('fs');

// Schemes
var Post = require('./defineSchema/Post');


// Daily Get Colleges Data from external Url
exports.getPostsData = function(req, res){
	console.log("Start Get All Walla Post...");

	let postsArr = [];

	async.waterfall([

        function(callback) { // Get Details

        	console.log("Start: A - 1");
			console.log("get Walla posts START!");

			var postDetails = {
				title: 'h1.title',
				date: 'div.info > .date',
				subtitle: 'h2.subtitle',
				text: '.section-0 > p'
			};

			var currPost = 0;
			var currentPost = 0;

			for (var i = 1774624; i<1774825; i++) {

				let newPost = new Post();
				newPost.name = "walla - news";
				newPost._id = i;
				let newUrl = "https://news.walla.co.il/item/"+i;
				newPost.url = newUrl;

				scrapy.scrape(newUrl, postDetails, function(err, data) {
				    if (err) {
				    	// console.error(err);
				    }
				    else if((data.title)&&(Array.isArray(data.text))) {
				    	console.log(currPost+" => "+JSON.stringify(data, null, 2));
					    newPost.title = data.title;
					    if(Array.isArray(data.subtitle))
					    	newPost.subtitle = data.subtitle[0];
					    else newPost.subtitle = data.subtitle;
					    if(Array.isArray(data.text)){
					    	let tmpPost = "";
					    	for (var i = 0; i < data.text.length; i++) {
					    		tmpPost += " "+data.text[i]+" ";
					    		if(i==data.text.length-1){
					    			newPost.text = tmpPost;
					    		}
					    	}
					    }
					    newPost.date = data.date;
					    postsArr[currentPost] = newPost;
					    currentPost++;
					}
				    if(currPost==200) {
				    	console.log("End: A - 1");
				    	callback(null, "a11111");	
				    }
				    else currPost++;
				});
			}
	    },

    ],  
    function (err) {
    	console.log("Save Json START!");
    	var json = JSON.stringify(postsArr, null, 2);
    	// console.log(json);
    	fs.writeFile('data/posts.json', json, 'utf8', function(){			
			console.log("Save Json is finished!");
		});


		for (var i = 0; i < postsArr.length; i++) {
			postsArr[i].save(function(err, newPost){
				if(err){
					console.log(err);
				}
				else {
					console.log("Create Post successfully : "+newPost.title);
					// console.log("Department => "+JSON.stringify(newDepartment, null, 4));
				}
			})
		}

		// for (var i = 0; i < postsArr.length; i++) {
		// 	Department.update(
		// 	{ "_id": postsArr[i]._id },
		// 	{ "$set": { 
		// 		name:  postsArr[i].name, 
		// 		title: postsArr[i].title,
		// 		subtitle: postsArr[i].subtitle, 
		// 		text: postsArr[i].text,
		// 		url: postsArr[i].url,
		// 	}}).
		// 	exec (function(err, newPost){
		// 		if(err){
		// 			console.log(err);
		// 		}
		// 		if(newPost){
		// 			console.log("Post Updated successfully");
		// 		}
		// 	})
		// }


	});
};

// Daily Get Colleges Data from external Url
exports.getPostsYnet = function(req, res){
	console.log("Start Get All Ynet Post...");

	let postsArr = [];

	async.waterfall([

        function(callback) { // Get Details

        	console.log("Start: A - 1");
			console.log("get Ynet posts START!");

			var postDetails = {
				title: 'h1',
				date: 'span.art_header_footer_author',
				subtitle: 'div.art_header_sub_title',
				text: '.text14 span',
				maintainers: 
	              { selector: '.text14 > span > p',
	                get: 'text',
	                prefix: '' }
			};

			var currPost = 0;
			var currentPost = 0;

			for (var i = 5321607; i<5321708; i++) {

				let newPost = new Post();
				newPost.name = "ynet - news";
				newPost._id = i;
				let newUrl = "https://www.ynet.co.il/articles/0,7340,L-"+i+",00.html";
				newPost.url = newUrl;

				scrapy.scrape(newUrl, postDetails, function(err, data) {
				    if (err) {
				    	// console.error(err);
				    }
				    else if((data.title)&&(Array.isArray(data.text))) {
				    	console.log(currPost+" => "+JSON.stringify(data, null, 2));
					    newPost.title = data.title;
					    if(Array.isArray(data.subtitle))
					    	newPost.subtitle = data.subtitle[0];
					    else newPost.subtitle = data.subtitle;
					    if(Array.isArray(data.text)){
					    	let tmpPost = "";
					    	for (var i = 0; i < data.text.length; i++) {
					    		tmpPost += " "+data.text[i]+" ";
					    		if(i==data.text.length-1){
					    			newPost.text = tmpPost;
					    		}
					    	}
					    }
					    newPost.date = data.date[1];
					    postsArr[currentPost] = newPost;
					    currentPost++;
					}
					console.log("test => "+JSON.stringify(data, null, 2));
					// let originalStr = data.text.split(" ");
					// let finalStr = "";
					// for (var i = 0; i < originalStr.length; i++) {
					// 	let tmpStr = originalStr[i];
					// 	var position = tmpStr.search(/[\u0590-\u05FF]/);
					// 	if(position >= 0){
					// 	    // alert('String contains Hebrew');
					// 	    finalStr += tmpStr+" "
					// 	}
					// 	if(i==originalStr.length-1){
					// 		console.log("finalStr: "+finalStr);
					// 		postsArr[currPost] = finalStr;
					// 		currPost++;
					// 	}
					// }
				    if(currPost==100) {
				    	console.log("End: A - 1");
				    	callback(null, "a11111");	
				    }
				    else currPost++;
				});
			}
	    },

    ],  
    function (err) {
    	console.log("Save Json START!");
    	var json = JSON.stringify(postsArr, null, 2);
    	// console.log(json);
    	fs.writeFile('data/posts.json', json, 'utf8', function(){			
			console.log("Save Json is finished!");
		});


		// for (var i = 0; i < postsArr.length; i++) {
		// 	postsArr[i].save(function(err, newPost){
		// 		if(err){
		// 			console.log(err);
		// 		}
		// 		else {
		// 			console.log("Create Post successfully : "+newPost.title);
		// 			// console.log("Department => "+JSON.stringify(newDepartment, null, 4));
		// 		}
		// 	})
		// }

		// for (var i = 0; i < postsArr.length; i++) {
		// 	Department.update(
		// 	{ "_id": postsArr[i]._id },
		// 	{ "$set": { 
		// 		name:  postsArr[i].name, 
		// 		title: postsArr[i].title,
		// 		subtitle: postsArr[i].subtitle, 
		// 		text: postsArr[i].text,
		// 		url: postsArr[i].url,
		// 	}}).
		// 	exec (function(err, newPost){
		// 		if(err){
		// 			console.log(err);
		// 		}
		// 		if(newPost){
		// 			console.log("Post Updated successfully");
		// 		}
		// 	})
		// }


	});
};


// Daily Get Colleges Data from external Url
exports.getPosts10 = function(req, res){
	console.log("Start Get All 10 Post...");

	let postsArr = [];

	async.waterfall([

        function(callback) { // Get Details

        	console.log("Start: A - 1");
			console.log("get 10 posts START!");

			var postDetails = {
				title: 'h1',
				date: 'p.article-he-date',
				subtitle: 'h2',
				text: '.article-text',
				// maintainers: 
	   //            { selector: '.text14 > span > p',
	   //              get: 'text',
	   //              prefix: '' }
			};

			var currPost = 0;
			var currentPost = 0;

			for (var i = 648549; i<648750; i++) {

				let newPost = new Post();
				newPost.name = "maariv - news";
				newPost._id = "m"+i;
				let newUrl = "http://www.maariv.co.il/news/israel/Article-"+i;
				newPost.url = newUrl;

				scrapy.scrape(newUrl, postDetails, function(err, data) {
				    if (err) {
				    	// console.error(err);
				    }
				    else if((data.title)&&(data.text)) {
				    	console.log(currPost+" => "+JSON.stringify(data, null, 2));
					    newPost.title = data.title;
					    if(Array.isArray(data.subtitle))
					    	newPost.subtitle = data.subtitle[0];
					    else newPost.subtitle = data.subtitle;
					    if(Array.isArray(data.text)){
					    	let tmpPost = "";
					    	for (var i = 0; i < data.text.length; i++) {
					    		tmpPost += " "+data.text[i]+" ";
					    		if(i==data.text.length-1){
					    			newPost.text = tmpPost;
					    		}
					    	}
					    }
					    else newPost.text = data.text;
					    newPost.date = data.date;
					    postsArr[currentPost] = newPost;
					    currentPost++;
					}
					// console.log("test => "+JSON.stringify(data, null, 2));

					// let originalStr = data.text.split(" ");
					// let finalStr = "";
					// for (var i = 0; i < originalStr.length; i++) {
					// 	let tmpStr = originalStr[i];
					// 	var position = tmpStr.search(/[\u0590-\u05FF]/);
					// 	if(position >= 0){
					// 	    // alert('String contains Hebrew');
					// 	    finalStr += tmpStr+" "
     		  	    // 	}
					// 	if(i==originalStr.length-1){
					// 		console.log("finalStr: "+finalStr);
					// 		postsArr[currPost] = finalStr;
					// 		currPost++;
					// 	}
					// }
				    if(currPost==200) {
				    	console.log("End: A - 1");
				    	callback(null, "a11111");	
				    }
				    else currPost++;
				});
			}
	    },

    ],  
    function (err) {
    	console.log("Save Json START!");
    	var json = JSON.stringify(postsArr, null, 2);
    	// console.log(json);
    	fs.writeFile('data/posts.json', json, 'utf8', function(){			
			console.log("Save Json is finished!");
		});


		for (var i = 0; i < postsArr.length; i++) {
			postsArr[i].save(function(err, newPost){
				if(err){
					console.log(err);
				}
				else {
					console.log("Create Post successfully : "+newPost.title);
					// console.log("Department => "+JSON.stringify(newDepartment, null, 4));
				}
			})
		}

		// for (var i = 0; i < postsArr.length; i++) {
		// 	Department.update(
		// 	{ "_id": postsArr[i]._id },
		// 	{ "$set": { 
		// 		name:  postsArr[i].name, 
		// 		title: postsArr[i].title,
		// 		subtitle: postsArr[i].subtitle, 
		// 		text: postsArr[i].text,
		// 		url: postsArr[i].url,
		// 	}}).
		// 	exec (function(err, newPost){
		// 		if(err){
		// 			console.log(err);
		// 		}
		// 		if(newPost){
		// 			console.log("Post Updated successfully");
		// 		}
		// 	})
		// }


	});
};



exports.getAllPosts = function(req, res){
	console.log("Start Get All Walla Post...");
	Post.find().where('_id').exec (function(err, data){
		if(err) {
			console.log(err);
			return res.status(500).send();
		}
		// console.log(JSON.stringify(data, null, 2));
		console.log("Get Posts Successfully Done !");
		return res.status(200).send(data);
	})
};


exports.getPostByKeyword = function(req, res){
	console.log("Start Get Posts by keyword => "+req.body.keyword);


    let searchKeyword1 = " "+req.body.keyword+" ";
    let searchKeyword2 = " "+req.body.keyword+", ";
    let searchKeyword3 = " "+req.body.keyword+'" ';
    let searchKeyword4 = " "+req.body.keyword+'". ';
    let searchKeyword5 = ' "'+req.body.keyword+" ";
    let searchKeyword6 = " "+req.body.keyword+": ";
    let searchKeyword7 = " "+req.body.keyword+"\\. ";

    console.log("{"+searchKeyword1+"}");
    console.log("{"+searchKeyword2+"}");
    console.log("{"+searchKeyword3+"}");
    console.log("{"+searchKeyword4+"}");
    console.log("{"+searchKeyword5+"}");
    console.log("{"+searchKeyword6+"}");
    console.log("{"+searchKeyword7+"}");

	let keyword = req.body.keyword;
	Post.find({ 
		$or:[ 
			{"title":{ "$regex": searchKeyword1 }},
			{"title":{ "$regex": searchKeyword2 }},
			{"title":{ "$regex": searchKeyword3 }},
			{"title":{ "$regex": searchKeyword4 }},
			{"title":{ "$regex": searchKeyword5 }},
			{"title":{ "$regex": searchKeyword6 }},

			{"subtitle":{ "$regex": searchKeyword1 }},
			{"subtitle":{ "$regex": searchKeyword2 }},
			{"subtitle":{ "$regex": searchKeyword3 }},
			{"subtitle":{ "$regex": searchKeyword4 }},
			{"subtitle":{ "$regex": searchKeyword5 }},
			{"subtitle":{ "$regex": searchKeyword6 }},

			{"text":{ "$regex": searchKeyword1 }},
			{"text":{ "$regex": searchKeyword2 }},
			{"text":{ "$regex": searchKeyword3 }},
			{"text":{ "$regex": searchKeyword4 }},
			{"text":{ "$regex": searchKeyword5 }},
			{"text":{ "$regex": searchKeyword6 }},
			// {"text":{ "$regex": searchKeyword7 }}

		] 
	})
	.where('_id').exec (function(err, data){
		if(err) {
			console.log(err);
			return res.status(500).send();
		}
		console.log(JSON.stringify(data, null, 2));
		console.log("Get Post By Keyword Successfully Done !");
		return res.status(200).send(data);
	})
};