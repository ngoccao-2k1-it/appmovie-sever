const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
const Schema = mongoose.Schema;
mongoose.plugin(slug);

const movie = new Schema({
    name: { type: String, maxLength: 255, },
    category: { type: String, maxLength: 255 },
    country: { type: String, maxLength: 50 },
    type: { type: String, maxLength: 50 },
    time: { type: String, maxLength: 10, },
    describe: { type: String, maxLength: 2000 },
    creatAt: { type: Date, default: Date.now },
    image_src: { type: String, },
    slug: { type: String, slug: 'name', unique: true },
    follow: { type: Array },
});

module.exports = mongoose.model('movies', movie);