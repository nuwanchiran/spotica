import { IonApp } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import {  Redirect, Route } from 'react-router-dom';
import NoMatch from 'react-router-nomatch';

import Login from './pages/Login'
import Dashboard from './pages/dashboard/Dashboard'
import NotFound404 from './pages/404/404'


/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

import './App.css';

const code = new URLSearchParams(window.location.search).get("code")

function App() {

  return(  
    <IonApp>
      <IonReactRouter>
        <NoMatch component={NotFound404}>
        <Route path="/" exact={true}>
          {code? <Dashboard code={code}/>: <Redirect to="/login"/>}
        </Route>
        <Route path="/login">
          <Login/>
        </Route>
      </NoMatch>
      </IonReactRouter>
    </IonApp>
  )
}

export default App;
