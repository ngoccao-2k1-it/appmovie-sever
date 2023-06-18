const mongoose = require('mongoose');
const categorys = require('./schemas/category');


module.exports = {
    creat: async(categoryUpload) => {
        //post comment {name = category}
        try {
            let creatCategory = {
                category: categoryUpload.name,
            };
            await new comments(creatCategory).save();
            return { success: true, data: await categorys.find({ id_movie: comment.id }).sort({ creatAt: 1 }) };
        } catch (error) {
            console.log(error);
            return { success: false };
        }
    },

    show: async() => {
        //get show comment {/:id_movie }
        try {
            return { success: true, data: await categorys.find({}) };
        } catch (error) {
            console.log(error);
            return { success: false };
        }
    },



    update: async(categoryUpload) => {
        //post update comment {id = 'id cmt' , c= 'content  update' }
        try {
            await categorys.updateOne({ _id: categoryUpload._id }, { category: categoryUpload.name });
            return { success: true, data: await categorys.find({}) };
        } catch (error) {
            console.log(error);
            return { success: false };
        };
    },

    del: async(categoryUpload) => {
        //get delete comment {/:id }
        try {
            await categorys.deleteOne({ _id: categoryUpload.id });
            return { success: true, data: await categorys.find({}) };
        } catch (error) {
            console.log(error);
            return { success: false };
        };
    }
};