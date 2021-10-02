const express = require('express');
const cors = require('cors')
const SpotifyWebApi = require("spotify-web-api-node")
const bodyParser = require("body-parser")
const lyricsFinder = require("lyrics-finder")
const GeniusFetcher = require('genius-lyrics-fetcher');
const solenolyrics = require("solenolyrics");

require('dotenv').config()

const lyricsClientGenius = new GeniusFetcher.Client(process.env.GENIUS_ACCESS_TOKEN);

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))



app.post('/refresh', async (req, res) => {
  const refreshToken = req.body.refreshToken

  const spotifyApi = new SpotifyWebApi({
    redirectUri: "http://localhost:3000",
    clientId: process.env.clientId,
    clientSecret: process.env.clientSecret,
    refreshToken,
  })

  try {
    const data = await spotifyApi.refreshAccessToken()

    const { access_token, expires_in } = data.body

    res.status(200).json({
      accessToken: access_token,
      expiresIn: expires_in
    })

  } catch (e) {
    res.sendStatus(400)
  }

})
app.post('/login', async (req, res) => {

  const code = req.body.code

  const spotifyApi = new SpotifyWebApi({
    redirectUri: "http://localhost:3000",
    clientId: process.env.clientId,
    clientSecret: process.env.clientSecret,
  })

  try {
    const data = await spotifyApi.authorizationCodeGrant(code)

    res.status(200).json({
      accessToken: data.body.access_token,
      refreshToken: data.body.refresh_token,
      expiresIn: data.body.expires_in
    })

  } catch (e) {
    console.log(e);
    res.sendStatus(400)
  }
})

app.get('/lyrics', async (req, res) => {
  let track = req.query.track
  let artist = req.query.artist

  var lyrics = "No lyrics found"
  var ok = false
  try {
    lyricsClientGeniusResponse = await lyricsClientGenius.fetch(track, artist)
    console.log(lyricsClientGeniusResponse);
    lyrics = lyricsClientGeniusResponse.lyrics
    if (lyrics.length > 0) {
      ok = true;
      res.json({ lyrics })
    }
  }
  catch (e) {
    console.error(e);
  }
  try {
    if (!ok) {
      // then try lyrics-finder library
      lyrics = await lyricsFinder(artist, track)
      console.log("Finding from lyrics-finder: " + lyrics);
      if (lyrics.length > 0) {
        ok = true;
        res.json({ lyrics })
      }
    }
  }
  catch (e) {
    console.error(e);
  }
  try {
    if (!ok) {
      // then try solenolyrics library
      soleno_Lyrics = await solenolyrics.requestLyricsFor(track);
      lyrics = soleno_Lyrics
      console.log("Finding from solenolyrics: " + lyrics);
      if (lyrics.length > 0) {
        ok = true;
        res.json({ lyrics })
      }
    }
  }
  catch (e) {
    console.error(e);
  }
  res.json({ lyrics })
})

app.listen(9000);
