# <img src="https://user-images.githubusercontent.com/44756803/135732324-2bb3486d-1bd6-4681-8c81-6e0bb7adf68e.png" width="70" height="70" />     Spotica - Song player and lyrics app
##### An OAuth2.0 based Application with Spotify <img src="https://user-images.githubusercontent.com/44756803/135732161-1c585dc5-236e-464a-9032-3b8947d82b9a.png" width="30" height="30" /> API

## Preview
<!-- ![image](https://user-images.githubusercontent.com/44756803/135732391-97adf268-e1bf-4b38-8833-5db7f8dfdb9f.png) -->
![image](https://user-images.githubusercontent.com/44756803/135753326-a0700682-d592-4d62-a738-69d4deea1a4b.png)


## Installation requirements

- `node v14.*`
- `yarn 1.22.*`

## Set up the application in local environment
1. Clone the app from Github
2. Go to https://developer.spotify.com and create a project to get a client id and a secret id.
3. Create a .env file in the root of client folder and add client id and root URL to it.

    REACT_APP_AUTH_URL=https://accounts.spotify.com/authorize
    REACT_APP_CLIENT_ID=<Client id>

4. Create a .env file in the root of server folder and add client id, secret id and genius access token to it.

    clientId=<Client id>
    clientSecret=<Secret id>
    GENIUS_ACCESS_TOKEN=<Genius access token>
    
5. Genius access token can be created from https://genius.com/api-clients

## Start server

    yarn install
    yarn run devstart

## Start client app

    yarn install
    yarn start

## How to test
1. After starting server and client, goto [localhost:3000](http://localhost:3000/)
2. Click login with Spotify.
3. Enter your spotify login details and submit.
4. If successfull, you will be redirected to the client app again.
5. Now you are successfully logged in.
