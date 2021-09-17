import React, { useEffect, useState } from 'react'
import useAuth from '../../hooks/useAuth'
import { IonApp, IonButton, IonFooter, IonIcon, IonImg, IonSearchbar, IonThumbnail } from '@ionic/react';
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import SpotifyWebApi from 'spotify-web-api-node';

import './../dashboard/dashboard.css'

const spotifyWebApi = new SpotifyWebApi({
  clientId: process.env.REACT_APP_CLIENT_ID,
})

const Dashboard = ({code}) => {
  const accessToken = useAuth(code)
  
  const [search, setSearch] = useState("")
  const [foundData, setFoundData] = useState([])

  useEffect(() => {
    if(!accessToken) return;
    spotifyWebApi.setAccessToken(accessToken)
  },[accessToken])

  useEffect(() => {
    getTracks()
  }, [search, accessToken])

  const getTracks = async () => {
    try{
      if(!search) return setFoundData([])
      if(!accessToken) return 
      
      let res = await spotifyWebApi.searchTracks(search)
      console.log(res.body.tracks);
    }catch (e){
      console.error(e)
    }
  }

  return (
    <IonPage>
      <IonHeader >
        <IonToolbar>
          <IonButton slot="start" fill="clear" onClick={()=> window.location = '/'}>
              <IonImg src="/assets/spotica-240.png" alt="Spotica Logo" style={{ height: "100%"}}/>
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
            onIonChange={e=> { console.log(e.detail.value); setSearch(e.detail.value)}}
          />
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
      <IonToolbar>
            <IonTitle size="large">Home</IonTitle>
          </IonToolbar>
      </IonContent>

      <IonFooter>
        Footer
      </IonFooter>
    </IonPage>
  )
}

export default Dashboard
