import React from "react"

const AUTH_URL = "https://accounts.spotify.com/authorize?client_id=0c34f9d23dff4f7caea72df7c617b76a&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state"

export default function Login() {
  return (<div className="logo-container">
    <img src="assets/spotica-240.png" alt="The Spotica logo" width="240" height="240"/>
    <a href={AUTH_URL} className="spotify-login-button-container">
      <img src="assets/spotify.png" alt="The Spotify log" width="48" height="48"/>
      <button className="btn-spotify-login">Login with Spotify</button>
    </a>
  </div>)
}
