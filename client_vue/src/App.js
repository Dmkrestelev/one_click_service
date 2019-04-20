import React, { Component } from 'react'
import { axiosLocal } from 'services/axiosInstances'
import { withRemoteData } from 'remote-data-provider'
import logo from './logo.svg';
import './App.css';


let options = {
    request: {
        url: 'home/home.json'
    },
    axiosInstance: axiosLocal
}

@withRemoteData(options)

class App extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
        </header>
      </div>

    );
  }
}

export default App;
