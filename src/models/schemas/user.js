const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const user = new Schema({
    email: {
        type: String,
        maxLength: 255,
    },
    password: {
        type: String,
        maxLength: 255,
    },
    jurisdiction: {
        type: String,
        maxLength: 255,
    },
    verify_user: {
        type: String,
        maxLength: 1000,
    },
    access_token: {
        type: String,
        maxLength: 1000,
    },
});

module.exports = mongoose.model('users', user);