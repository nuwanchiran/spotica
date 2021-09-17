import React from "react"

const AUTH_URL = `${process.env.REACT_APP_AUTH_URL}?client_id=${process.env.REACT_APP_CLIENT_ID}&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state%20user-top-read`

console.log(process.env)

export default function Login() {
  return (<div className="logo-container">
    <img src="assets/spotica-240.png" alt="The Spotica logo" width="240" height="240"/>
    <a href={AUTH_URL} className="spotify-login-button-container">
      <img src="assets/spotify.png" alt="The Spotify log" width="48" height="48"/>
      <button className="btn-spotify-login">Login with Spotify</button>
    </a>
  </div>)
}
