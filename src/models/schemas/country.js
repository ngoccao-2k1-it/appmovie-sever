const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const country = new Schema({
    country: {
        type: String,
        maxLength: 255,
        unique: true,
    },

});

module.exports = mongoose.model('countrys', country);