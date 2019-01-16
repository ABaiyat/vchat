import React, { Component } from 'react';
import { Input, Button } from 'semantic-ui-react';
import Stomp from 'stomp-websocket';

class ChatRoom extends Component {
    constructor() {
        super();
    }

    async componentDidMount() {
        const { pathname } = this.props.location;
        const roomID = pathname.replace('/rooms/', '');
        console.log(roomID);
        this.setState({isLoading: true});

        this.stomp = Stomp.client('ws://localhost:8080/socket/websocket');
        this.stomp.connect({}, () => {
            const roomURL = '/app/rooms/' + roomID;
            const topicURL = '/topic/rooms/' + roomID;
            console.log(roomURL);
            this.stomp.send(roomURL, {}, "");
            this.stomp.subscribe(topicURL, (message) => {
               //TODO: Implement logic to receive messages
            });
        });
    }

    render() {
        return (<h1>ChatRoom</h1>)
    }
}

export default ChatRoom;