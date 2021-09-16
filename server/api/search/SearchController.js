const { query } = require("express");

function searchSong(req, res){
    
    const query = req.query["q"];
    
    if(!query)
        res.status(500).send({
            success: false,
            error: "Query parameter `q` is missing"
        })
    else{
        // TODO: Call SpotifyAPI to search songs using submitted keyword

        res.send([
            {name: "Halleluijah", artist: "Nisuga"},
            {name: "Bol pini wahena", artist: "Rookantha Gunathilake"}
        ])
    }
}

function listDefaultSongs(req, res){
    // TODO: List default songs list of the user
}

module.exports = {
    searchSong, listDefaultSongs
}