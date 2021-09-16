var express = require('express');
var searchRoute = express.Router();
const searchController = require( "./SearchController")

searchRoute.get("/", searchController.searchSong)
searchRoute.get("/default", searchController.listDefaultSongs)

module.exports = searchRoute