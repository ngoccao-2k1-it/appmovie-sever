const movieRoute = require('./movieRoute');
const detailmovieRoute = require('./detailMoviRoute');
const user = require('./user');
const comment = require('./comment')


function route(app) {

    app.use('/movie', movieRoute);
    app.use('/detailmovie', detailmovieRoute);
    app.use('/user', user);
    app.use('/comment', comment);

    // app.get('/', function(req, res) {
    //     fetch('http://localhost:3000/movie/api/category')
    //         .then(res => res.json())
    //         .then(json => console.log(json.data))
    // })


}

module.exports = route;