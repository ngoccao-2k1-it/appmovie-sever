const mongoose = require('mongoose');
const users = require('./schemas/user');




module.exports = {
    creat: async(user) => {
        try {
            data = {
                email: user.username,
                password: user.password,
                jurisdiction: '',
                verify_user: '',
                access_token: '',
            }
            await new users(data).save();
            return { success: true };
        } catch (error) {
            console.log(error);
            return { success: false };
        }
    },

    login: async(user) => {
        try {
            data = await users.findOne({ email: user.username });
            if (data.password == user.password) {
                return {
                    success: true,
                    data: await users.findOne({ email: user.username }).select('email -_id')
                };
            } else {
                return { success: false };
            }
        } catch (error) {
            console.log(error);
            return { success: false };
        }
    },

    show: () => {
        return users.find({});
    },

    update: async(user) => {
        if (user.newpassword.length < 8 || user.newpassword.length > 24)
            return 'false';
        try {
            data = await users.findOne({ email: user.email });
            if (data.password == user.password) {
                await users.updateOne({ email: user.username }, { password: user.newpassword });
                return 'true';
            } else {
                return 'false';
            }
        } catch (error) {
            console.log(error);
            return 'false';
        }
    },

    del: async(user) => {
        try {
            await users.deleteOne({ email: user.email })
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
};