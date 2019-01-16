import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'semantic-ui-css/semantic.min.css'

import {Button} from 'semantic-ui-react';
import Welcome from './components/Welcome/Welcome';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Welcome/>
      </div>
    );
  }
}

export default App;
