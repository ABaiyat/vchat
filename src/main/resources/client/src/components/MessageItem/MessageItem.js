import React from 'react';
import { Message } from 'semantic-ui-react';

const MessageItem = (props) => {
    const { sender, content, date, username } = props;
    let messageType;
    if (sender === username) {
        messageType = 'sentMessage';
    } else if (sender === 'HOST-SERVER') {
        messageType = 'serverMessage';
    } else {
        messageType = 'receivedMessage';
    }

    return (
        <div className={`messageItem ${messageType}`}>
            <Message compact className='usernameHeader' color='green'>
                <Message.Header>{sender}</Message.Header>
                <p className='content'>{content}</p>
            </Message>
        </div>
    )
};

export default MessageItem;