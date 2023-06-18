const express = require('express')
    // const handlebars = require('express-handlebars')
    // const path = require('path')
const cors = require('cors');
const route = require('./routes')
const db = require('./config/db')
const multer = require('multer')





db.connect();

const app = express();
app.use(cors());
app.options('*', cors());
const port = process.env.PORT || 3000;
// const hbs = handlebars.create({ extname: '.hbs' });


app.use(express.json());
app.use(express.urlencoded({ extended: true }))
    // app.engine('hbs', hbs.engine);
    // app.set('view engine', 'hbs');
    // app.set('views', path.join(__dirname, 'resources\\views'));

route(app);



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});