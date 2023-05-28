const express = require('express')
    // const handlebars = require('express-handlebars')
    // const path = require('path')
const route = require('./routes')
const db = require('./config/db')
const multer = require('multer')
const upload = multer()


db.connect();

const app = express();
const port = process.env.PORT || 3000;
// const hbs = handlebars.create({ extname: '.hbs' });




app.use(express.urlencoded({ extended: true }))
    // app.engine('hbs', hbs.engine);
    // app.set('view engine', 'hbs');
    // app.set('views', path.join(__dirname, 'resources\\views'));

route(app);

// app.post('/upload', upload.any('file'), async(req, res) => {
//     console.log(req.files);
//     console.log(req.body);
//     uploadfile.uploadFile(req.file);
//     res.send(req.files);
// })

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});