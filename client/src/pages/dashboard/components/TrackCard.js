import React, { useEffect, useRef } from 'react'
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonIcon, IonImg, IonItem, IonLabel } from '@ionic/react'
import Palette, { usePalette } from 'react-palette'
import { play } from 'ionicons/icons';

export default function TrackCard({ track, onClick }) {

    const { data, loading, error } = usePalette(track.albumUrl)
    const ionItemRef = useRef(null)

    useEffect(() => {
       const gradient = `linear-gradient(${data.vibrant}, ${data.darkVibrant})`
       ionItemRef.current.style.setProperty('--background', gradient);
       //ionItemRef.current.style.setProperty('--background', `radial-gradient( circle farthest-corner at 10% 20%,  ${data.lightVibrant} 0%, ${data.light} 90% )`);
    }, [data])

    return (
        <IonCard button style={{ width: "100%"}} onClick={onClick}>
            <IonItem ref={ionItemRef}>
                <IonImg src={track.albumUrl} alt={track.albumUrl} slot="start" />
                <IonLabel> 
                    <IonCardTitle style={{color: "white", fontWeight: "bold"}}>{track.name}</IonCardTitle>
                    <IonCardSubtitle style={{color: "white"}}>{track.artist}</IonCardSubtitle>
                </IonLabel>
                <IonButton  shape="round" fill="clear" color="medium" size="large" slot="end" >
                    <IonIcon icon={play}/>
                </IonButton>
            </IonItem>
        </IonCard>
    )
}
