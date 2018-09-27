import React, { Component } from 'react';
import {BrowserRouter as Router,Route} from 'react-router-dom'
import NavBar from './components/NavBar'
import LoginView from './views/LoginView'
import UserView from './views/UserView'
import GenreView from './views/GenreView'
import SignUpView from './views/SignUpView'
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
            <Route exact path="/" component={LoginView}/>
            <Route exact path="/user/:id" render={({match})=><UserView userId={match.params.id}/>}/>
            <Route exact path="/genre/:id" render={({match})=><GenreView genreId={match.params.id}/>}/>
             <Route exact path="/signup" component={SignUpView}/>
          </div>
      </Container>
      </div>
      </Router>
    );
  }
}

export default App;
