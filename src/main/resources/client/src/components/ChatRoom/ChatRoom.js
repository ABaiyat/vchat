import React, { Component } from 'react';
import { Input, Button, Icon } from 'semantic-ui-react';
import Stomp from 'stomp-websocket';
import MessageList from '../MessageList/MessageList';

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
            this.stomp.send(roomURL, {}, JSON.stringify({name: username}));
            this.stomp.subscribe(topicURL, (message) => {
                const { messages } = this.state;
                const messageObject = JSON.parse(message.body);
                if (messages.length === 0) {
                    const messageObject = {
                        sender: 'HOST-SERVER',
                        content: 'Welcome to Chatroom ' + roomID + '!',
                        date: 1000,
                        type: 'CONNECTED'
                    };
                    messages.push(messageObject);
                } else {
                    messages.push(messageObject);
                }
                this.setState({messages});
            });
            this.stomp.subscribe(topicURL + '/sendMessage', (message) => {
                const { messages } = this.state;
                const messageObject = JSON.parse(message.body);
                console.log(messageObject);
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
        const { username } = this.props;
        // console.log(messages);
        // const messageList = messages.map((message) => {
        //     return (
        //         <MessageItem sender={message.sender} content={message.content} username={username}/>
        //     )
        // });

        return (
            <div>
                <h1>ChatRoom</h1>
                <Input value={this.state.input} action={<Button onClick={this.handleButton}><Icon name='send'/></Button>}
                    onChange={this.handleChange} placeholder="Type your message..."/>
                <MessageList messages={messages} username={username} />
            </div>
        )
    }
}

export default ChatRoom;