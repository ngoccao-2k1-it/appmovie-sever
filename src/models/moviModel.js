const mongoose = require('mongoose');
const movies = require('./schemas/movie');
const cloudinary = require('../middleware/cloudinary');

let dataMovie = {
    name: '',
    category: '',
    country: '',
    type: '',
    time: '',
    describe: '',
    year: '',
}

function resetDataMovie() {
    dataMovie.name = '',
        dataMovie.category = '',
        dataMovie.country = '',
        dataMovie.type = '',
        dataMovie.time = '',
        dataMovie.describe = '',
        dataMovie.year = ''
}


function dataUpload(movie) {
    resetDataMovie();
    dataMovie.name = movie.name.toLowerCase().trim(),
        dataMovie.category = movie.category.toLowerCase().trim(),
        dataMovie.country = movie.country.toLowerCase().trim(),
        dataMovie.type = movie.type.toLowerCase().trim(),
        dataMovie.time = movie.time.toLowerCase().trim(),
        dataMovie.describe = movie.describe.toLowerCase().trim(),
        dataMovie.year = movie.year.toLowerCase().trim();
}

module.exports = {
    creat: async(res, movie, file) => {
        dataUpload(movie);
        await new movies(dataMovie).save()
            .then(data => {
                cloudinary.uploadCloudinary(file, 'image', data._id)
                    .then(async dataCloud => {
                        await movies.updateOne({
                            _id: data._id
                        }, {
                            image_src: dataCloud.url,
                            id_image: dataCloud.public_id
                        })
                        res.json({ 'success': 'true' })
                    })
                    .catch(async(error) => {
                        console.log(error);
                        await movies.deleteOne({ _id: data._id })
                        res.json({ 'success': 'false' })
                    })
            })
            .catch(error => {
                console.log(error);
                res.json({ 'success': 'false' })
            })
    },

    show: async() => {
        try {
            return { success: true, data: await movies.find() };
        } catch (error) {
            console.log(error);
            return { success: false, };
        }
    },



    getOneMovie: async(movie) => {
        try {
            return { success: true, data: await movies.find({ slug: movie.slug }) };
        } catch (error) {
            console.log(error);
            return { success: false, };
        }
    },

    update: async(res, movie, file) => {
        dataUpload(movie);
        await movies.updateOne({ _id: movie._id }, dataMovie)
            .then(async() => {
                await movies.findOne({ _id: movie._id })
                    .then(data => {
                        if (file) {
                            idImageDelete = data.id_image;
                            //reupload file cloudinay
                            cloudinary.uploadCloudinary(file, 'image', data.id)
                                .then(async dataCloud => {
                                    await movies.updateOne({
                                            _id: data._id
                                        }, {
                                            image_src: dataCloud.url,
                                            id_image: dataCloud.public_id
                                        })
                                        //delete file cloudinary
                                    cloudinary.destroyCloudinary(idImageDelete, 'image')
                                    res.json({ 'success': 'true' })
                                })
                                .catch(error => {
                                    console.log(error);
                                    res.json({ 'success': 'false' })
                                })
                        } else {
                            res.json({ 'success': 'true' })
                        }
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

    del: async(res, movie) => {
        await movies.findOne({ _id: movie._id })
            .then(data => {
                cloudinary.destroyCloudinaryByTags(data._id)
                    .then(async() => {
                        cloudinary.destroyCloudinary(data.id_image, 'image')
                        await movies.deleteOne({ _id: movie._id });
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

    search: async(movie) => {
        try {
            return await movies.find({ name: { $regex: movie.name.toLowerCase().trim() } });
        } catch (error) {
            console.log(error, movie.name);
        }

    },

    filterCategory: async(movie) => {
        try {
            console.log(movie.category);
            return await movies.find({ category: { $regex: movie.category } });

        } catch (error) {
            console.log(error);
        }
    },

    filterType: async(movie) => {
        try {
            return await movies.find({ type: { $regex: movie.type } });
        } catch (error) {
            console.log(error);
        }
    },

    category: async() => {
        try {
            let ctg = await movies.find({});
            let categoryString = '';

            ctg.forEach(function(item) {
                categoryString += item.category.toString() + ',';
            });

            let arrString = categoryString.split(",");
            categoryString = '';

            arrString.forEach(function(item) {
                item = item.toString().trim().toLowerCase();
                if (categoryString.search(item) == -1) {
                    categoryString += item + ',';
                }
            });
            let arrCategory = categoryString.split(',');
            arrCategory.pop();
            return arrCategory;
        } catch (error) {
            return error;
        }
    },

    addFollow: async(movie) => {
        try {
            let data = {
                _id: movie.id,
                email: movie.e,
            }
            if (await movies.countDocuments({ _id: data._id }) == 0) {
                return { success: false };
            }
            await movies.updateOne({ _id: data._id }, { $push: { follow: data.email } })
            return { success: true };
        } catch (error) {
            console.log(error);
            return { success: false };
        }
    }
};