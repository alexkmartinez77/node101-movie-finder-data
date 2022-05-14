var express = require('express');
var morgan = require('morgan');
var axios = require('axios');
require('dotenv').config();


var app = express();
var cache = [];
var movieKeys = {
  i: 'imdbID',
  t: 'Title'
}

app.use(morgan('dev'));

app.get('/', function(req, res){
  // Returns false if not found and returns the actual movie object if found
  const findMovie = (key, value) => {
    let found = false;
    cache.forEach(movie => {
      console.log('movie[key]', movie[key], 'value', value);
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
      .then(movie => {cache.push(movie.data); res.status(200).send(movie.data)})
      .catch((e) => {console.log(e.message); res.send('OMDB Error.')});
    }
  }

  // Assign incoming key to variable x
  let x = (Object.keys(req.query)[0]);
  //Look for movie in cache array and return movie or boolean false
  let movie = findMovie(movieKeys[x], req.query[x]);
  //If false returned then make axios call and push movie into movie array
  axiosCall(movie, x, req.query[x]);
})

module.exports = app;