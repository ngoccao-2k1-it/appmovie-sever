const express = require('express');
const router = express.Router();
const comments = require('../models/comment');



router.post('/api/add', async(req, res) => {
    await comments.creat(req.body)
        .then(data => res.json(data))
})

router.get('/api/show/:id', async(req, res) => {
    await comments.show(req.params)
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
        '/show/:id': "get comment {/:id_detail_movie }",
        '/update': "put comment {id = 'id cmt' , c= 'content  update' }",
        '/delete/:id': "delete comment {/:id_comment }",
    })
})
module.exports = router;