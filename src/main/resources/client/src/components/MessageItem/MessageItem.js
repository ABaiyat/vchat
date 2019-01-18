import React from 'react';
import { Message } from 'semantic-ui-react';

const MessageItem = (props) => {
    const { sender, content, username } = props;
    let messageType;
    let color;
    let header = <React.Fragment />;
    if (sender === username) {
        messageType = 'sentMessage';
        color='white'
    } else if (sender === 'HOST-SERVER') {
        messageType = 'serverMessage';
        color='teal'
    } else {
        messageType = 'receivedMessage';
        color='green';
        header = <Message.Header>{sender}</Message.Header>;
    }

    return (
        <div className={`messageItem ${messageType}`}>
            <Message compact className='usernameHeader' color={color}>
                {header}
                <p className='content'>{content}</p>
            </Message>
        </div>
    )
};

export default MessageItem;