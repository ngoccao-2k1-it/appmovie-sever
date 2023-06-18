const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const yearCreatAt = new Schema({
    yearCreatAt: {
        type: String,
        maxLength: 255,
        unique: true,
    },
});

module.exports = mongoose.model('year_creatats', yearCreatAt);