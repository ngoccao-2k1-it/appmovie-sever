const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb+srv://caodev2k1:RDj9BxiEfe285dvW@dev.knxwzx6.mongodb.net/db_movies_dev');
        console.log('connect successfully');
    } catch (error) {
        console.log(error);
    }

}
module.exports = { connect };