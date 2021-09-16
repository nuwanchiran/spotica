import React from 'react'
import useAuth from '../../hooks/useAuth'
import { IonApp, IonButton, IonFooter, IonIcon, IonImg, IonSearchbar, IonThumbnail } from '@ionic/react';
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';



const Dashboard = ({code}) => {
  const accessToken = useAuth(code)
  
  return (
    <IonPage>
      <IonHeader >
        <IonToolbar>
          <IonButton slot="start" fill="clear">
              <IonImg src="/assets/spotica-240.png" alt="Spotica Logo" style={{ height: "100%"}} />
            </IonButton>
          <IonSearchbar placeholder="Search spotify"  slot="start"  fill="clear"/>
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
