import React from 'react'
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonIcon, IonImg, IonItem, IonLabel } from '@ionic/react'
import Palette, { usePalette } from 'react-palette'
import { play } from 'ionicons/icons';

export default function TrackCard({ track }) {

    const { data, loading, error } = usePalette(track.albumUrl)
    const gradient = `linear-gradient(${data.muted}, ${data.darkMuted})`

    return (
        <IonCard style={{ background: 'red', width: "100%"}}>
            <IonItem >
                <IonImg src={track.albumUrl} alt={track.albumUrl} slot="start" />
                <IonLabel > 
                    <IonCardTitle>{track.name}</IonCardTitle>
                    <IonCardSubtitle>{track.artist}</IonCardSubtitle>
                </IonLabel>
                <IonButton  shape="round" fill="clear" color="medium" size="large" slot="end" >
                    <IonIcon icon={play}/>
                </IonButton>
            </IonItem>
        </IonCard>
    )
}
