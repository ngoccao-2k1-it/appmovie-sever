const mongoose = require('mongoose');
const users = require('./schemas/user');
const { use } = require('../routes/user');




module.exports = {
    creat: async(res, user) => {

        data = {
            email: user.username,
            password: user.password,
            jurisdiction: user.jurisdiction,
            verify_user: '',
            access_token: '',
        }
        await new users(data).save()
        then(() => {
                res.json({
                    success: 'true',
                    data: user.username,
                });
            })
            .catch(error => {
                console.log(error);
                res.json({ success: false })
            });

    },

    login: async(res, user) => {
        await users.findOne({ email: user.username })
            .then(data => {
                if (data.password == user.password) {
                    res.json({
                        success: 'true',
                        data: data.email
                    })
                } else {
                    res.json({ success: 'false' })
                }
            })
            .catch(error => {
                console.log(error);
                res.json({ success: 'f', })
            })
    },

    loginAdmin: async(res, user) => {
        await users.findOne({ email: user.username })
            .then(data => {
                if (data.password == user.password && data.jurisdiction == 'admin') {
                    res.json({
                        success: 'true',
                        data: data.email
                    })
                } else {
                    res.json({ success: 'false' })
                }
            })
            .catch(error => {
                console.log(error);
                res.json({ success: 'f', })
            })
    },

    show: () => {
        return users.find({});
    },

    search: async(user) => {
        try {
            return await users.find({ email: { $regex: user.username.toLowerCase().trim() } });
        } catch (error) {
            console.log(error);
        }

    },

    update: async(user) => {
        if (user.newpassword.length < 8 || user.newpassword.length > 24)
            return 'false';
        try {
            data = await users.findOne({ email: user.username });
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

    AdminUpdate: async(res, user) => {
        await users.updateOne({ email: user.username }, { password: user.password, jurisdiction: user.jurisdiction })
            .then(() => { res.json({ success: 'true' }) })
            .catch(error => {
                console.log(error);
                res.json({ success: 'false' })
            })
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