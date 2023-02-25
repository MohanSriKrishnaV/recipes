const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const user = new Schema({
    email: { type: String, unique: true },
    password: { type: String }
});
const UserModel = mongoose.model('User', user);
module.exports = UserModel;
