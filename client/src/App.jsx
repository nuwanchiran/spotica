import { IonApp } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import {  Redirect, Route } from 'react-router-dom';
import NoMatch from 'react-router-nomatch';

import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import NotFound404 from './pages/404/404'

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
