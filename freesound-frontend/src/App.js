import React, { Component } from 'react';
import {BrowserRouter as Router,Route} from 'react-router-dom'
import AudioForm from './components/AudioForm'
import UserView from './views/UserView'
import Notification from './components/Notification'
import {Container} from 'semantic-ui-react'

class App extends Component {
  
  render() {
    return (
      <Router>
        <Container>
          <h1>Freesound frontend</h1>
          <Notification/>
          <Route exact path="/login" render={()=><UserView/>}/>
          <Route exact path="/audio" render={()=><AudioForm/>}/>
        </Container>
      </Router>
    );
  }
}

export default App;
