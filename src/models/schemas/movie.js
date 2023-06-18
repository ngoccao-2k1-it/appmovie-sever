const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
const Schema = mongoose.Schema;
mongoose.plugin(slug);

const movie = new Schema({
    name: {
        type: String,
        maxLength: 255,
        unique: true,
    },
    category: {
        type: String,
        maxLength: 255,
    },
    country: {
        type: String,
        maxLength: 255,
    },
    type: {
        type: String,
        maxLength: 255,
    },
    time: {
        type: String,
        maxLength: 255,
    },
    describe: {
        type: String,
        maxLength: 2000,
    },
    creatAt: {
        type: Date,
        default: Date.now,
    },
    image_src: {
        type: String,
        maxLength: 1000,
    },
    id_image: {
        type: String,
        maxLength: 1000,
    },
    slug: {
        type: String,
        maxLength: 255,
        slug: 'name',
        unique: true,
    },
    follow: {
        type: Array,
    },
    year: {
        type: String,
        maxLength: 255,
    }
});

module.exports = mongoose.model('movies', movie);