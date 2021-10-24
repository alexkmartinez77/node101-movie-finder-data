//iimporting/requiring files
var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var axios = require('axios');
require('dotenv').config();

//creating app server
var app = express();
var movies = [];

//middleware
app.use(morgan('dev'));
app.use(bodyParser.json());

//routes
app.get('/', function(req, res){
  console.log(movies);
  // Returns false if not found and returns the actual movie object if found
  const findMovie = (key, value) => {
    let found = false;
    movies.forEach(movie => {
      if (movie[key].toLowerCase() == value.toLowerCase()) 
        found = movie;
    })
    return found;
  }

  //Makes a call to axios with key/value pair provided by user
  const axiosCall = (foundMovie, key, value) => {
    if(foundMovie){
      res.status(200).send(foundMovie);
    } else {
      axios({method: 'get', url: `http://www.omdbapi.com/?${key}=${value}&apikey=${process.env.API_KEY}`,})
      .then(movie => {movies.push(movie.data); res.status(200).send(movie.data)})
      .catch((e) => {console.log(e.message); res.send('OMDB Error.')});
    }
  }

  //Query by movie ID
  if("i" in req.query){
    let iMovie = findMovie('imdbID', req.query.i);
    axiosCall(iMovie, 'i', req.query.i);
  }

  //Query by movie Name
  else if("t" in req.query){
    let tMovie = findMovie('Title', req.query.t);
    axiosCall(tMovie, 't', req.query.t);
  }

  //If Key/Value info is correctly entered.
  else{res.send('Cannot process as entered.')}
})

module.exports = app;