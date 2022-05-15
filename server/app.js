var express = require('express');
var morgan = require('morgan');
var axios = require('axios');
require('dotenv').config();


var app = express();
var cache = [];

app.use(morgan('dev'));

app.get('/', function(req, res){

  let foundMovie = cache.find(movie => movie[req.url[2] == 'i' ? 'imdbID' : 'Title'].toLowerCase() == Object.values(req.query).shift())
  if(foundMovie != undefined){
    res.status(200).send(foundMovie);
  } else {
    axios({method: 'get', url: `http://www.omdbapi.com${req.url}&apikey=${process.env.API_KEY}`,})
    .then(movie => {cache.push(movie.data); res.status(200).send(movie.data)})
    .catch((e) => {console.log(e.message); res.send('Please make a valid OMDB query.')});
  }
  console.log(cache)
})

module.exports = app;