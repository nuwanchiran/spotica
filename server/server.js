const express = require('express');
const cors = require('cors')
const SpotifyWebApi = require("spotify-web-api-node")
const bodyParser = require("body-parser")
const lyricsFinder = require("lyrics-finder")
const GeniusFetcher = require('genius-lyrics-fetcher');

const ACCESS_TOKEN = '2DeKyKgLvsKBpjaHDdsYXID3oGG7Bghdo0O2HdvkIwnkBsggRtZtHEdiOXt4D0i_';
const lyricsClient = new GeniusFetcher.Client(ACCESS_TOKEN);

require('dotenv').config()

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended : true}))



app.post('/refresh',async (req,res) => {
  const refreshToken = req.body.refreshToken

  const spotifyApi = new SpotifyWebApi({
    redirectUri: "http://localhost:3000",
    clientId: process.env.clientId,
    clientSecret: process.env.clientSecret,
    refreshToken,
  })

  try {
    const data = await spotifyApi.refreshAccessToken()

    const {access_token,expires_in} = data.body

    res.status(200).json({
      accessToken:access_token,
      expiresIn:expires_in
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

app.get('/lyrics',async (req,res) => {
  lyricsResponse = await lyricsClient.fetch(req.query.track, req.query.artist)
  console.log(lyricsResponse);
  const lyrics = lyricsResponse.lyrics || "No lyrics found"

  res.json({lyrics})
})

app.listen(9000);
