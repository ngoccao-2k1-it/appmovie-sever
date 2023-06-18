const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const trending = new Schema({
    id_movie: {
        type: String, 
        maxLength: 255,
    },
    viewtime: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('trendings', trending);