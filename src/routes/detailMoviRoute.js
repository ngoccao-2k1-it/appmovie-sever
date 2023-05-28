const express = require('express');
const router = express.Router();
const detailMovieModel = require('../models/detailMovieModel');

router.post('/api/add', (req, res) => {
    detailMovieModel.creat(req.body)
        .catch(error => res.json({ success: 'false', error: error }))
});

router.get('/api/idshow/:id_movie', async(req, res) => {
    await detailMovieModel.idShow(req.params)
        .then(data => res.json(data))
});

router.get('/api/slugshow/:slug', async(req, res) => {
    data = await detailMovieModel.slugShow(req.params)
        .then(data => res.json(data))

});

router.put('/api/update', async(req, res) => {
    let data = await detailMovieModel.update(req.body);
    res.json({ success: data })
})

router.delete('/api/delete/:_id', async(req, res) => {
    data = await detailMovieModel.del(req.params);
    res.json({ success: data })
})


router.get('/api', (req, res) => {
    res.json({
        '/add': "post tập phim {id_movie = 'id của bộ phim' , name= 'tên tập phim', part= 'số tập phim'}, movie_src:'link video tập phim'",
        '/idshow/:id_movie': "get tập phim {/:id_movie id của bộ phim trả về ds tập phim }",
        '/slugshow/:slug': "get một tập phim {/:slug của tập phim, trả về 1 tập phim }",
        '/update': "put tập phim {_id = 'id tập phim' ,id_movie = 'id của bộ phim' , name= 'tên tập phim', part= 'số tập phim'}, movie_src:'link video tập phim' }",
        '/delete/:id': "delete tập phim {/:id _id của tập phim }",
    })
})

module.exports = router;