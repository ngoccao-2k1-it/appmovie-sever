const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const comment = new Schema({
    id_movie: { type: String },
    email: { type: String },
    content: { type: String },
    creatAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('comments', comment);