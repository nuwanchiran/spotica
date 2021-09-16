import {  IonContent, IonHeader, IonPage, IonRouterLink, IonTitle, IonToolbar } from '@ionic/react';

import './../404/404.css'

const NotFound404 = () => {

  return (
    <IonPage>
      <IonContent fullscreen>
          <div className="container-404">
            <IonTitle size="large">Page not found</IonTitle>
            <br/>
            <IonRouterLink href="/">Home</IonRouterLink>
          </div>
      </IonContent>
    </IonPage>
  );
};

export default NotFound404;
