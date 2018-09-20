import React, { Component } from 'react';
import AudioForm from './components/AudioForm'
import Notification from './components/Notification'
class App extends Component {

  render() {
    return (
      <div>
        <h1>Freesound frontend</h1>
        <Notification/>
        <AudioForm/>
      </div>
    );
  }
}

export default App;
