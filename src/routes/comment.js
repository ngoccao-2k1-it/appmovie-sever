const express = require('express');
const router = express.Router();
const comments = require('../models/comment');




router.post('/api/add', async(req, res) => {
    console.log(req);
    await comments.creat(req.body)
        .then(data => res.json(data))
})

router.get('/api/show/', async(req, res) => {
    await comments.show(req.query)
        .then(data => res.json(data))
})


router.put('/api/update', async(req, res) => {
    await comments.update(req.body)
        .then(data => res.json(data))
})

router.delete('/api/delete/:id', async(req, res) => {
    await comments.del(req.params)
        .then(data => res.json(data))
})


router.get('/api', (req, res) => {
    res.json({
        '/add': "post comment {id = id_detail_movie , e= email, c= content}",
        "/show/?id_movie=''&limit=''": "get comment {id_movie='id bộ phim, limit='số cmt muốn lấy, tình từ cmt mới nhất'}",
        '/update': "put comment {id = 'id cmt' , c= 'content  update' }",
        '/delete/:id': "delete comment {/:id_comment }",
    })
})
module.exports = router;