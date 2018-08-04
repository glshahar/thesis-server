var mongoose = require('mongoose');
var schema = mongoose.Schema;

var postSchema = new schema({
	_id: {type: String, index:1, required:true, unique:true},
	name: String,
	url: String,
	date: String,
	title: String,
	subtitle: String,
	text: String,
}, {collection: 'Posts'});

var Post = mongoose.model('Department', postSchema);

module.exports = Post;
