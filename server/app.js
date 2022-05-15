var express = require('express');
var morgan = require('morgan');
var axios = require('axios');
require('dotenv').config();

var app = express();
var cache = [];

app.use(morgan('dev'));
app.set('json spaces', 2);

app.get('/', function(req, res){

  let foundMovie = cache.find(movie => movie[Object.keys(req.query).shift() == 'i' ? 'imdbID' : 'Title'].toLowerCase() == Object.values(req.query).shift())
  if(foundMovie){
    res.status(200).send(foundMovie);
  } else {
    axios.get(`http://www.omdbapi.com${req.url}&apikey=${process.env.API_KEY}`)
         .then(movie => {cache.push(movie.data); res.status(200).send(movie.data)})
         .catch((e) => {console.log(e.message); res.send('Please make a valid OMDB query.')});
  }
})

module.exports = app;