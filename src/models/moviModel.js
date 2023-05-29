const mongoose = require('mongoose');
const movies = require('./schemas/movie');
var slug = require('slug');



module.exports = {
    creat: async(movie) => {
        try {
            await new movies(movie).save();
            return { success: true, data: await movies.find() };
        } catch (error) {
            console.log(error);
            return { success: false, };
        }
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

    update: async(movie) => {
        try {
            await movies.updateOne({ _id: movie._id }, movie);
            return { success: true, data: await movies.find() };
        } catch (error) {
            console.log(error);
            return { success: false, };
        }
    },

    del: async(movie) => {
        try {
            await movies.findByIdAndDelete(movie._id)
            return true;
        } catch (error) {
            console.log(error);
            return { success: false, };
        }
    },

    search: async(movie) => {
        try {
            return await movies.find({ name: { $regex: movie.name } });
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