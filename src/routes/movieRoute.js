const express = require('express');
const router = express.Router();
const movieModels = require('../models/moviModel');


router.post('/api/add', async(req, res) => {
    movieModels.creat(req.body)
        .then(data => res.json(data))
});


router.get('/api/show', async(req, res) => {
    await movieModels.show()
        .then(data => res.json(data))
});

router.get('/api/getmovie/:slug', async(req, res) => {
    await movieModels.getOneMovie(req.params)
        .then(data => res.json(data))
});

router.put('/api/update', async(req, res) => {
    await movieModels.update(req.body)
        .then(data => res.json(data))
})

router.delete('/api/delete/:_id', async(req, res) => {
    let data = await movieModels.del(req.params);
    res.json({ success: data })
})



router.get('/api/search/:name', async(req, res) => {
    const data = await movieModels.search(req.params);
    res.json({
        success: 'true',
        data: data
    });
});

router.get('/api/category', (req, res) => {
    movieModels.category()
        .then(data => res.json(data))
});

router.put('/api/addfollow', async(req, res) => {
    await movieModels.addFollow(req.body)
        .then(data => res.json(data))
})


router.get('/api', (req, res) => {
    res.json({
        '/add': "post phim {name = 'tên của bộ phim' , category= 'thể loại', country= 'quốc gia'}, type:'loại phim',time:'thời lượng phim',describe:'mô tả phim',image_src:'link ảnh phim' ",
        '/show': "get toàn bộ phim ",
        '/getmovie/:slug': "get một phim {/:slug của bộ phim, trả về 1 phim }",
        '/update': "put phim {_id = 'id bộ phim' ,name = 'tên của bộ phim' , category= 'thể loại', country= 'quốc gia'}, type:'loại phim',time:'thời lượng phim',describe:'mô tả phim',image_src:'link ảnh phim' }",
        '/delete/:id': "delete phim {/:id _id của bộ phim }",
        '/search/:name': "get bộ phim {/:name cụm từ muốn tìm kiếm theo tên bộ phim }",
        '/category': "get thể loại{lấy toàn bộ ds thể loại phim có trong phim }",
        '/addfollow': "post follow bộ phim{id:'id của bộ phim',e:'email(tài khoản người dùng)' }",
    })
})
module.exports = router;