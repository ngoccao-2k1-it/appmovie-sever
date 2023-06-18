const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const category = new Schema({
    category: {
        type: String,
        maxLength: 255,
        unique: true,
    },
});

module.exports = mongoose.model('categorys', category);