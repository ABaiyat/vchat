import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Welcome from './components/Welcome/Welcome';
import ChatRoom from './components/ChatRoom/ChatRoom';
import RoomList from './components/RoomList/RoomList';

import './App.css';
import 'semantic-ui-css/semantic.min.css'

class App extends Component {
  render() {
    return (
      <div className="App">
          <BrowserRouter>
            <Switch>
              <Route exact path="/" component={Welcome} />
              <Route exact path="/rooms" component={RoomList}/>
              <Route exact path="/rooms/:roomId" component={ChatRoom}/>
            </Switch>
          </BrowserRouter>
      </div>
    );
  }
}

export default App;
