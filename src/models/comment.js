const mongoose = require('mongoose');
const comments = require('./schemas/comment');


module.exports = {
    creat: async(comment) => {
        //post add comment {id = id_detail_movie , e= email, c= content}
        if (!comment.id || !comment.e || !comment.c) {
            return { success: false };
        }
        try {
            let cmt = {
                id_detail_movie: comment.id,
                email: comment.e,
                content: comment.c
            };
            await new comments(cmt).save();
            return { success: true, data: await comments.find({ id_detail_movie: comment.id }).sort({ creatAt: 1 }) };
        } catch (error) {
            console.log(error);
            return { success: false };
        }
    },

    show: async(comment) => {
        //get show comment {/:id_detail_movie }
        try {
            return { success: true, data: await comments.find({ id_detail_movie: comment.id }).sort({ creatAt: 1 }) };
        } catch (error) {
            console.log(error);
            return { success: false };
        }
    },

    update: async(comment) => {
        //post update comment {id = 'id cmt' , c= 'content  update' }
        try {
            let cmt = {
                _id: comment.id,
                content: comment.c
            };
            let data = await comments.findOne({ _id: comment.id });
            data = data.id_detail_movie;
            await comments.updateOne({ _id: cmt._id }, { content: cmt.content });
            return { success: true, data: await comments.find({ id_detail_movie: data }).sort({ creatAt: 1 }) };
        } catch (error) {
            console.log(error);
            return { success: false };
        };
    },

    del: async(comment) => {
        //get delete comment {/:id_comment }
        try {
            let data = await comments.findOne({ _id: comment.id });
            data = data.id_detail_movie;
            await comments.deleteOne({ _id: comment.id });
            return { success: true, data: await comments.find({ id_detail_movie: data }).sort({ creatAt: 1 }) };
        } catch (error) {
            console.log(error);
            return { success: false };
        };
    }
};