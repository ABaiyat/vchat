import React, { Component } from 'react';
import { Input, Button } from 'semantic-ui-react';
import Stomp from 'stomp-websocket';

class ChatRoom extends Component {
    constructor() {
        super();
        this.state = {
            input: '',
            roomID: ''
        }
    }

    async componentDidMount() {
        const { pathname } = this.props.location;
        const roomID = pathname.replace('/rooms/', '');
        console.log(roomID);
        this.setState({roomID});

        this.stomp = Stomp.client('ws://localhost:8080/socket/websocket');
        this.stomp.connect({}, () => {
            const roomURL = '/app/rooms/' + roomID;
            const topicURL = '/topic/rooms/' + roomID;
            this.stomp.send(roomURL, {}, "");
            this.stomp.subscribe(topicURL, (message) => {
                console.log(message);
            });
            this.stomp.subscribe(topicURL + '/sendMessage', (message) => {
                console.log(message);
            });
        });
    }

    handleButton = () => {
        const {roomID, input} = this.state;
        if (input !== "") {
            const message = {
                sender: 'Bob',
                content: input,
                date: 1000,
                type: 'SENT'
            };
            this.stomp.send('/app/rooms/' + roomID + '/sendMessage', {}, JSON.stringify(message));
        }
    };

    handleChange = (event) => {
        this.setState({input: event.target.value})
    };

    render() {
        return (
            <div>
                <h1>ChatRoom</h1>
                <Input value={this.state.input} onChange={this.handleChange} placeholder="Enter your Name..."/>
                <Button onClick={this.handleButton}>Submit</Button>
            </div>

        )
    }
}

export default ChatRoom;