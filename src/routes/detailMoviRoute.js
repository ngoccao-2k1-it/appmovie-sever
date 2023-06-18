const express = require('express');
const router = express.Router();
const detailMovieModel = require('../models/detailMovieModel');
const { uploadCloudinary } = require('../middleware/cloudinary');
const multer = require('multer');





const parser = multer();


router.post('/api/add', parser.single('file'), async(req, res) => {
    await detailMovieModel.creat(res, req.body, req.file)
});

router.get('/api/idshow/:id_movie', async(req, res) => {
    await detailMovieModel.idShow(req.params)
        .then(data => res.json(data))
});

router.get('/api/slugshow/:slug', async(req, res) => {
    data = await detailMovieModel.slugShow(req.params)
        .then(data => res.json(data))

});

router.put('/api/update', parser.single('file'), async(req, res) => {
    await detailMovieModel.update(res, req.body, req.file)
})

router.delete('/api/delete/:_id', async(req, res) => {
    await detailMovieModel.del(res, req.params);
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