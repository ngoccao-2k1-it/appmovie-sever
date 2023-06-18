const mongoose = require('mongoose');
const cloudinary = require('../middleware/cloudinary');
const detailMovies = require('./schemas/detailMovie');
const movies = require('./schemas/movie');

let dataDetailMovie = {
    id_movie: '',
    name: '',
    part: '',
}

function resetDetailMovie() {
    dataDetailMovie.id_movie = '',
        dataDetailMovie.name = '',
        dataDetailMovie.part = ''
}

async function dataDetailUpload(detailMovie) {
    resetDetailMovie();
    dataDetailMovie.id_movie = detailMovie.id_movie.toLowerCase().trim(),
        dataDetailMovie.part = await detailMovies.countDocuments({ id_movie: detailMovie.id_movie })
    dataDetailMovie.part = 'tập ' + (dataDetailMovie.part + 1);
    await movies.findOne({ _id: detailMovie.id_movie })
        .then(data => {
            dataDetailMovie.name = data.name + ' tập ' + dataDetailMovie.part;
        })
        .catch(error => console.log(error))


}

module.exports = {
    creat: async(res, detailMovie, file) => {
        dataDetailUpload(detailMovie)
            .then(() => {
                new detailMovies(dataDetailMovie).save()
                    .then(data => {
                        cloudinary.uploadCloudinary(file, 'video', detailMovie.id_movie)
                            .then(async dataCloud => {
                                await detailMovies.updateOne({
                                    _id: data._id
                                }, {
                                    id_video: dataCloud.public_id,
                                    movie_src: dataCloud.url
                                })
                                res.json({ 'success': 'true' })
                            })
                            .catch(async error => {
                                console.log(error);
                                await detailMovies.deleteOne({ _id: data._id });
                                res.json({ 'success': 'false' })
                            })
                    })
                    .catch(error => {
                        console.log(error);
                        res.json({ 'success': 'false' })
                    })
            })
            .catch(error => {
                console.log(error);
                res.json({ 'success': 'false' })
            })

    },

    idShow: async(movie) => {
        try {
            return { success: true, data: await detailMovies.find({ id_movie: movie.id_movie }) };
        } catch (error) {
            console.log(error);
            return false;
        }
    },

    slugShow: async(movie) => {
        try {
            return { success: true, data: await detailMovies.find({ slug: movie.slug }) };
        } catch (error) {
            console.log(error);
            return false;
        }
    },

    update: async(res, detailMovie, file) => {
        dataDetailUpload(detailMovie);
        await detailMovies.updateOne({ _id: detailMovie._id }, dataDetailMovie)
            .then(async() => {
                await detailMovies.findOne({ _id: detailMovie._id })
                    .then(data => {
                        idVideoDelete = data.id_video;
                        //reupload file cloudinay
                        cloudinary.uploadCloudinary(file, 'video', detailMovie.id_movie)
                            .then(async dataCloud => {
                                await detailMovies.updateOne({
                                    _id: data._id
                                }, {
                                    movie_src: dataCloud.url,
                                    id_video: dataCloud.public_id
                                })
                                console.log(dataCloud);
                                //delete file cloudinary
                                cloudinary.destroyCloudinary(idVideoDelete, 'video')
                                res.json({ 'success': 'true' })
                            })
                            .catch(error => {
                                console.log(error);
                                res.json({ 'success': 'false' })
                            })
                    })
                    .catch(error => {
                        console.log(error)
                        res.json({ 'success': 'false' })
                    })
            })
            .catch(error => {
                console.log(error)
                res.json({ 'success': 'false' })
            })
    },

    del: async(res, detailMovie) => {
        await detailMovies.findOne({ _id: detailMovie._id })
            .then(data => {
                cloudinary.destroyCloudinary(data.id_video, 'video')
                    .then(async() => {
                        await detailMovies.deleteOne({ _id: detailMovie._id });
                        res.json({ 'success': 'true' });
                    })
                    .catch(error => {
                        console.log(error);
                        res.json({ 'success': 'false' });
                    })
            })
            .catch(error => {
                console.log(error);
                res.json({ 'success': 'false' });
            })
    },
};