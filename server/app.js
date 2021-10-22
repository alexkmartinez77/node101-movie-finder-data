const express = require('express');
const app = express();
require('dotenv').config();


const api = process.env.API_KEY
// When making calls to the OMDB API make sure to append the '&apikey=8730e0e' parameter

module.exports = app;