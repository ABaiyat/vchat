import React, { Component } from 'react';
import { Input, Button } from 'semantic-ui-react';
import Stomp from 'stomp-websocket';

class ChatRoom extends Component {
    constructor() {
        super();
        this.state = {
            input: '',
            roomID: '',
            messages: []
        }
    }

    async componentDidMount() {
        const { username } = this.props;
        const { pathname } = this.props.location;
        const roomID = pathname.replace('/rooms/', '');
        console.log(roomID);
        this.setState({roomID});

        if (username === '') {
            this.props.history.push('');
        }

        this.stomp = Stomp.client('ws://localhost:8080/socket/websocket');
        this.stomp.connect({}, () => {
            const roomURL = '/app/rooms/' + roomID;
            const topicURL = '/topic/rooms/' + roomID;
            this.stomp.send(roomURL, {}, "");
            this.stomp.subscribe(topicURL, (message) => {
                console.log(message);
            });
            this.stomp.subscribe(topicURL + '/sendMessage', (message) => {
                const { messages } = this.state;
                const messageObject = JSON.parse(message.body);
                messages.push(messageObject);
                this.setState({messages});
            });
        });
    }

    handleButton = () => {
        const {roomID, input} = this.state;
        const { username } = this.props;
        if (input !== "") {
            const message = {
                sender: username,
                content: input,
                date: 1000,
                type: 'SENT'
            };
            this.stomp.send('/app/rooms/' + roomID + '/sendMessage', {}, JSON.stringify(message));
            this.setState({input: ''})
        }
    };

    handleChange = (event) => {
        this.setState({input: event.target.value})
    };

    render() {
        const { messages } = this.state;
        console.log(messages);
        const messageList = messages.map((message) => {
            return (
                <div>
                    <h1>{message.content}</h1>
                    <h2>{message.sender}</h2>
                </div>

            )
        });
        return (
            <div>
                <h1>ChatRoom</h1>
                <Input value={this.state.input} onChange={this.handleChange} placeholder="Enter your Name..."/>
                <Button onClick={this.handleButton}>Submit</Button>
                {messageList}
            </div>

        )
    }
}

export default ChatRoom;