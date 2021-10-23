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

  res.status(200).send(movies[req.query.i]);

  if (movies[req.query.i]){
    return;
  } else {
  axios({
    method: 'get',
    url: `http://www.omdbapi.com/?i=${req.query.i}&apikey=${process.env.API_KEY}`,
  })
    .then(res => {
      movies[req.query.i] = res.data;
    });
  }
})

// When making calls to the OMDB API make sure to append the '&apikey=8730e0e' parameter

module.exports = app;