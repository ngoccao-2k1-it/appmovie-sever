const mongoose = require('mongoose');
const detailMovies = require('./schemas/detailMovie');



module.exports = {
    creat: async(detailMovie) => {
        try {
            return new detailMovies(detailMovie).save();
        } catch (error) {
            return error;
        }
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

    update: async(movie) => {
        try {
            if (await movies.countDocuments({ _id: movie._id }) > 0) {
                let data = {};
                Object.assign(data, movie);
                delete data._id;
                await movies.updateOne({ _id: movie._id }, data);
                console.log(data, movie);
                return 'true';
            }
        } catch (error) {
            console.log(error);
            return false;
        }
    },

    del: async(detailMovie) => {
        try {
            await detailMovies.deleteOne({ _id: detailMovie._id })
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    },

    // search: async(movie) => {
    //     try {
    //         await movies.find({ name: { $regex: movie.name } });
    //         return true;
    //     } catch (error) {
    //         console.log(error);

    //     }

    // },
};