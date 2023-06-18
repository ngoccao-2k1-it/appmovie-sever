const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);
const Schema = mongoose.Schema;


const detailMovie = new Schema({
    id_movie: {
        type: String,
        maxLength: 255
    },
    name: {
        type: String,
        maxLength: 255
    },
    part: {
        type: String,
        maxLength: 255
    },
    id_video: {
        type: String,
        maxLength: 255
    },
    creatAt: {
        type: Date,
        default: Date.now
    },
    movie_src: {
        type: String,
        maxLength: 1000
    },
    slug: {
        type: String,
        slug: 'name',
        unique: true
    },
});

module.exports = mongoose.model('detail_movies', detailMovie)