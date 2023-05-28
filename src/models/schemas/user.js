const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const user = new Schema({
    email: { type: String, minLength: 8, maxLength: 30 },
    password: { type: String, minLength: 8, maxLength: 24 },
    jurisdiction: { type: String, maxLength: 50 },
    verify_user: { type: String },
    access_token: { type: String },
});

module.exports = mongoose.model('users', user);