import React, { Component } from 'react';
import { Input, Button, Icon, Header, Divider, Grid, List } from 'semantic-ui-react';
import Stomp from 'stomp-websocket';
import MessageList from '../MessageList/MessageList';

class ChatRoom extends Component {
    constructor() {
        super();
        this.state = {
            input: '',
            roomID: '',
            messages: [],
            usersList: [{
                key: 0,
                name: 'John'
            }, {
                key: 1,
                name: 'Jacob'
            } ]
        };

    }

    async componentDidMount() {
        const { username } = this.props;
        const { pathname } = this.props.location;
        const roomID = pathname.replace('/rooms/', '');
        console.log(roomID);
        this.setState({roomID});
        this.scrollToBottom();

        if (username === '') {
            this.props.history.push('');
        } else {
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
    }

    componentDidUpdate = () => {
        this.scrollToBottom();
    };

    scrollToBottom = () => {
        this.messageList.scrollIntoView({behavior: 'smooth'});
    };

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
        const { messages, roomID, usersList } = this.state;
        const { username } = this.props;
        // console.log(messages);
        // const messageList = messages.map((message) => {
        //     return (
        //         <MessageItem sender={message.sender} content={message.content} username={username}/>
        //     )
        // });
        const usersListMapping = usersList.map((item) => {
           return (
               <List.Item key={item.key}>
                   <List.Icon name='user circle outline' size='big' verticalAlign='middle' />
                   <List.Content>
                       <List.Header color='teal' className='userHeader' as='h2'>{item.name}</List.Header>
                   </List.Content>
               </List.Item>
           )
        });
        return (
            <div className='chatRoom'>
                <Grid divided>
                    <Grid.Row>
                        <Grid.Column width={4}>
                            <div className='usersList'>
                                <List divided>
                                    {usersListMapping}
                                </List>
                            </div>
                        </Grid.Column>
                        <Grid.Column width={12}>
                            <div className='chatColumn'>
                                <Grid.Row>
                                    <div className='roomHeader'>
                                        <Header as='h2' icon textAlign='center'>
                                            <Icon name='users' color='black' circular />
                                            <Header.Content className='roomTitle'>{'ROOM ' + roomID}</Header.Content>
                                        </Header>
                                    </div>
                                </Grid.Row>
                                <Divider className='chatDivider'/>
                                <div className='messageContainer'>
                                    <MessageList messages={messages} username={username} />
                                    <div ref={messageList => {this.messageList = messageList}} />
                                </div>
                                <Grid.Row>
                                    <Input className='messageBox'
                                           fluid value={this.state.input}
                                           action={
                                               <Button color='teal' onClick={this.handleButton}><Icon name='send'/></Button>
                                           }
                                           onChange={this.handleChange} placeholder="Type your message..."/>
                                </Grid.Row>
                            </div>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>

            </div>
        )
    }
}

export default ChatRoom;