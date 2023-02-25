const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const post = new Schema({
    title: String,
    author: String,
    image: String,
    ingredients: [String],
    directions: String,
    user: { type: ObjectId, ref: "User" }

});
const PostModel = mongoose.model('Post', post);
module.exports = PostModel