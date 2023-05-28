const express = require('express');
const router = express.Router();
const user = require('../models/user');


router.post('/api/add', async(req, res) => {
    try {
        const data = await user.creat(req.body);
        res.json({
            success: 'true',
            data: data,
        });
    } catch (error) {
        res.json({
            success: 'false',
        });
        console.log(error);
    };
})

router.post('/api/login', async(req, res) => {
    await user.login(req.body)
        .then(data => res.json(data))

})

router.get('/api/show', async(req, res) => {
    const data = await user.show();
    res.json({
        success: 'true',
        data: data,
    });
})

router.put('/api/update', async(req, res) => {
    let data = await user.update(req.body);
    res.json({ success: data })
})

router.delete('/api/delete/:email', async(req, res) => {
    let data = await user.del(req.params);
    res.json({ success: data })
})

router.get('/api', (req, res) => {
    res.json({
        '/add': "post user {email = 'email người dùng' , password= 'mật khẩu' ",
        '/login': "post user {email = 'email người dùng' , password= 'mật khẩu' ",
        '/show': "get user trả về toàn bộ user",
        '/update': "put user {email = 'email' ,password = 'mk cũ' , newpassword= 'mk mới' }",
        '/delete/:email': "delete user {/:email email muốn xóa }",
    })
})

module.exports = router;