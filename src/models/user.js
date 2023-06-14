const mongoose = require('mongoose');
const users = require('./schemas/user');
const { use } = require('../routes/user');




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
        let returndata;
        // try {
        await users.findOne({ email: user.username })
            .then(data => {
                if (data.password == user.password) {
                    returndata = {
                        success: true,
                        data: data.email
                    };
                } else {
                    console.log('saipass');
                    returndata = {
                        success: false,
                    };
                }
            })
            .catch(error => {
                console.log(error);
                returndata = {
                    success: false,
                };
            })
        return returndata;

        // } catch (error) {
        //     console.log(error);
        //     return {
        //         success: false,
        //         username: typeof user.username,
        //         password: typeof user.password,
        //         datausser: user.username,
        //         datapass: user.password,
        //     };
        // }
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