import React, { Component } from 'react';
import { Input, Button, Card, Divider } from 'semantic-ui-react';
import Stomp from 'stomp-websocket';

class RoomList extends Component {
    constructor() {
        super();
        this.state = {
            rooms: [
                123,
                324,
                126
            ]
        }
    }

    handleItemClick = (key) => {
        console.log(key);
    };

    render() {
        const { rooms } = this.state;
        const roomList = rooms.map((room) => {
            return (
                <div key={room}className='roomItem' onClick={() => this.handleItemClick(room)}>
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