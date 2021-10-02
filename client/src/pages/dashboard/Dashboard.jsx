import React, { useEffect, useState } from 'react'
import useAuth from '../../hooks/useAuth'
import { IonApp, IonButton, IonCol, IonFooter, IonGrid, IonIcon, IonImg, IonItem, IonLabel, IonList, IonRefresher, IonRefresherContent, IonRow, IonSearchbar, IonThumbnail } from '@ionic/react';
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import SpotifyWebApi from 'spotify-web-api-node';
import TrackCard from './components/TrackCard';
import Player from '../../components/player/Player';
import { power } from 'ionicons/icons';

import './../dashboard/dashboard.css'
import axios from 'axios';

const spotifyWebApi = new SpotifyWebApi({
  clientId: process.env.REACT_APP_CLIENT_ID,
})

const Dashboard = ({ code }) => {
  const accessToken = useAuth(code)

  const [search, setSearch] = useState("")
  const [foundData, setFoundData] = useState([])
  const [currentTrack, setCurrentTrack] = useState([])
  const [lyrics, setLyrics] = useState("")

  const getMyTopTracks = async () => {
    if (accessToken) {
      let myTopTracksResponse = await spotifyWebApi.getMyTopTracks({ limit: 50 })

      let myTopTracks = myTopTracksResponse.body.items.map(track => {
        return {
          name: track.name,
          artist: track.artists[0].name,
          uri: track.uri,
          albumUrl: track.album.images.find(image => image.height < 100).url
        }
      })
      setFoundData(myTopTracks)
      if (!currentTrack)
        setCurrentTrack(myTopTracks[0])
    }
  }

  //NewReleases
  const getNewReleases = async () => {
    if (accessToken) {
      let NewReleasesResponse = await spotifyWebApi.getNewReleases({ limit: 10 })

      console.log("AAAAAAAAAAA " , NewReleasesResponse.body.albums.items)
      
      let NewReleases = NewReleasesResponse.body.albums.items.map(track => {
        return {
          name: track.name,
          artist: track.artists[0].name,
          uri: track.uri,
          albumUrl: track.images.find(image => image.height < 100).url
        }
      })
      setFoundData(NewReleases)
      if (!currentTrack)
        setCurrentTrack(NewReleases[0])
    }
  }

  //For lyrics usage
  useEffect(async () => {
    if (!currentTrack) return

    axios.get('http://localhost:9000/lyrics',{
      params:{
        track:currentTrack.name,
        artist:currentTrack.artist
      }
    }).then(res => {
      setLyrics(res.data.lyrics)
    })
  }, [currentTrack])


  useEffect(async () => {
    if (!accessToken) return;
    await spotifyWebApi.setAccessToken(accessToken)
    await getMyTopTracks()
  }, [accessToken])

  useEffect(() => {
    if (search.length === 0)
      getNewReleases() || getMyTopTracks()
    else
      getTracks()
  }, [search, accessToken])

  const getTracks = async () => {
    try {
      if (!search) return setFoundData([])
      if (!accessToken) return

      let res = await spotifyWebApi.searchTracks(search)

      console.log(res.body.tracks);
      let tracks = res.body.tracks.items.map(track => {
        return {
          name: track.name,
          artist: track.artists[0].name,
          uri: track.uri,
          albumUrl: track.album.images.find(image => image.height < 100).url
        }
      })
      setFoundData(tracks)

    } catch (e) {
      console.error(e)
    }
  }

  async function doRefresh(event) {
    console.log('Begin async operation');

    if (search.length > 0) {
      await getTracks()
    } else {
      await getNewReleases() || getMyTopTracks() 
    }
    event.detail.complete()
    console.log('Finished async operation');

  }

  return (
    <IonPage>
      <IonHeader >
        <IonToolbar>
          <IonButton shape="round" slot="start" fill="clear" size="large" onClick={() => window.location = '/'}>
            <IonImg src="/assets/spotica-240.png" alt="Spotica Logo" style={{ height: "100%" }} />
          </IonButton>
          <IonSearchbar
            placeholder="Search spotify"
            slot="start"
            showCancelButton="never"
            animated
            debounce={400}
            className="search-bar"
            searchIcon={false}
            value={search}
            onIonChange={e => { console.log(e.detail.value); setSearch(e.detail.value) }}
          />
          <IonButton shape="round" fill="clear" color="medium" size="large" slot="end" >
            <IonIcon icon={power} />
          </IonButton>
        </IonToolbar>
      </IonHeader>

      <IonContent
        fullscreen
        scrollY={false}
      >
        <IonGrid >
          <IonRow>
            <IonCol size="5">
              <IonContent>
                <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
                  <IonRefresherContent
                    pullingText="Pull to refresh"
                    refreshingSpinner="circles"
                    refreshingText="Refreshing..."
                  >
                  </IonRefresherContent>
                </IonRefresher>
                <IonList
                  lines='none'
                >
                  {foundData.map((track) => {
                    return (
                      <IonItem key={track.uri}>
                        <TrackCard track={track} onClick={() => setCurrentTrack(track)} />
                      </IonItem>
                    )
                  })}
                </IonList>
              </IonContent>
            </IonCol>
            <IonCol 
               className="ion-justify-content-center "
               style={{ whiteSpace:"pre", textAlign:"center", scrollY: "auto", fontFamily: "fangsong", paddingBottom: "40px"}}
              >
              <IonContent>
                {lyrics}
              </IonContent>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>

      <IonFooter>
        {/* This player is allowed only for premium Spotify users*/}
        {accessToken && <Player track={currentTrack} accessToken={accessToken} />}
      </IonFooter>
    </IonPage>
  )
}

export default Dashboard
