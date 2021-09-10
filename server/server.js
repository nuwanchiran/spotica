const express = require('express');
const cors = require('cors')
const SpotifyWebApi = require("spotify-web-api-node")

const app = express()
app.use(cors())
app.use(express.json());


app.post('/refresh',async (req,res) => {
  const refreshToken = req.body.refreshToken

  const spotifyApi = new SpotifyWebApi({
    redirectUri: "http://localhost:3000",
    clientId: "0c34f9d23dff4f7caea72df7c617b76a",
    clientSecret: "56316e0d42e04f59927ea75effa2dcc8",
    refreshToken,
  })

  try {
    const data = await spotifyApi.refreshAccessToken()
     // console.log(data.body);

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
    clientId: "0c34f9d23dff4f7caea72df7c617b76a",
    clientSecret: "56316e0d42e04f59927ea75effa2dcc8"
  })

  try {
    const data = await spotifyApi.authorizationCodeGrant(code)

    res.status(200).json({
      accessToken: data.body.access_token,
      refreshToken: data.body.refresh_token,
      expiresIn: data.body.expires_in
    })

  } catch (e) {
    res.sendStatus(400)
  }
})

app.listen(9000);
