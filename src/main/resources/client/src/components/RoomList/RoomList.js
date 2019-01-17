import React, { Component } from 'react';
import { Card, Button, Divider } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import Stomp from 'stomp-websocket';

class RoomList extends Component {
    constructor() {
        super();
        this.state = {
            greeting: '',
            rooms: []
        }
    }

    async componentDidMount() {
        this.setState({isLoading: true});
        const { username } = this.props;

        if (username === '') {
            this.props.history.push('');
        }
        this.stomp = Stomp.client('ws://localhost:8080/socket/websocket');
        this.stomp.connect({}, () => {
            this.stomp.send("/app/rooms", {}, "");
            this.stomp.subscribe('/topic/rooms', (message) => {
                const rooms = message.body.replace(']', '').replace('[', '').replace(/(?:\r\n|\r|\n)/g, ',');
                const roomArr = rooms.split(',');
                if (roomArr[0] === "") {
                    this.setState({rooms: []})
                } else {
                    this.setState({rooms: roomArr.map((value) => parseInt(value))});
                }
            });
        })
    }

    handleItemClick = (key) => {
        this.stomp.disconnect();
        this.props.history.push('rooms/' + key.toString());
    };

    render() {
        const { rooms } = this.state;
        const roomList = rooms.map((room) => {
            return (
                <div key={room} className='roomItem' >
                    <Button className='roomButton' color='teal' fluid onClick={() => this.handleItemClick(room)}>{room}</Button>
                </div>
            )
        });
        const prompt = (rooms.length === 0 ?
            'It looks like the host has no open rooms.' :
            'Select a room to join or start a chat!');
        return (
            <div className='roomList'>
                <Card centered>
                    <Card.Content className='roomListHeader' header='Room List' />
                    <Card.Description className='description'>{prompt}</Card.Description>
                    <Divider className='divider'/>
                    {roomList}
                </Card>
            </div>
        )
    }
}

export default withRouter(RoomList);