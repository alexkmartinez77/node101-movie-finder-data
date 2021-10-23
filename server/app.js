//iimporting/requiring files
var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var axios = require('axios');
require('dotenv').config();

//creating app server
var app = express();
var movies = {};
//middleware
app.use(morgan('dev'));
app.use(bodyParser.json());


app.get('/', function(req, res){

  //res.status(200).send(movies[req.query.i]);

  if (movies[req.query.i]){
    res.status(200).send(movies[req.query.i]);
  } else {
  axios({
    method: 'get',
    url: `http://www.omdbapi.com/?i=${req.query.i}&apikey=${process.env.API_KEY}`,
  })
    .then(movie => {
      movies[req.query.i] = movie.data;
      res.status(200).send(movie.data);
    });
  }
})

// When making calls to the OMDB API make sure to append the '&apikey=8730e0e' parameter

module.exports = app;