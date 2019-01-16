import React, { Component } from 'react';
import { Input, Button, Card, Divider } from 'semantic-ui-react';
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
        console.log(key);

    };

    render() {
        const { rooms } = this.state;
        const roomList = rooms.map((room) => {
            return (
                <div key={room} className='roomItem' onClick={() => this.handleItemClick(room)}>
                    <h4>{room}</h4>
                    <Divider className='divider'/>
                </div>
            )
        });
        return (
            <div className='roomList'>
                <Card centered>
                    <Card.Content className='roomListHeader' header='Room List' />
                    <Divider className='divider'/>
                    {roomList}
                </Card>
            </div>
        )
    }
}

export default RoomList;