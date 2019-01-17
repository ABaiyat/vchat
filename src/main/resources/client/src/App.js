import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Welcome from './components/Welcome/Welcome';
import ChatRoom from './components/ChatRoom/ChatRoom';
import RoomList from './components/RoomList/RoomList';

import './App.css';
import 'semantic-ui-css/semantic.min.css'

class App extends Component {
  constructor() {
    super();
    this.state = {
      username: ''
    }
  }
  callback = (data) => {
    this.setState({username: data});
  };

  render() {
    const {username} = this.state;
    return (
      <div className="App">
          <BrowserRouter>
            <Switch>
              <Route exact path="/" component={() => <Welcome callback={this.callback}/>} />
              <Route exact path="/rooms" component={() => <RoomList username={username}/>} />
              <Route exact path="/rooms/:roomId" component={(props) => <ChatRoom {...props} username={username}/>} />
            </Switch>
          </BrowserRouter>
      </div>
    );
  }
}

export default App;
