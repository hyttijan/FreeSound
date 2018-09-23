import React, { Component } from 'react';
import {BrowserRouter as Router,Route} from 'react-router-dom'
import AudioForm from './components/AudioForm'
import NavBar from './components/NavBar'
import UserView from './views/UserView'
import GenreView from './views/GenreView'
import Notification from './components/Notification'
import {Container} from 'semantic-ui-react'

class App extends Component {
  
  render() {
    return (
      <Router>
      <div>
      <NavBar/>
      <Container>

        <h1>Freesound frontend</h1>
        <Notification/>
          <div>
            <Route exact path="/login" component={UserView}/>
            <Route exact path="/audio" render={()=><AudioForm/>}/>
            <Route exact path="/genre/:id" render={({match})=><GenreView genreId={match.params.id}/>}/>
          </div>
      </Container>
      </div>
      </Router>
    );
  }
}

export default App;
