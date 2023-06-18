const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const comment = new Schema({
    id_movie: {
        type: String,
        maxLength: 255,
    },
    email: {
        type: String,
        maxLength: 255,
    },
    content: {
        type: String,
        maxLength: 255,
    },
    creatAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('comments', comment);