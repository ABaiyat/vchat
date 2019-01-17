import React from 'react';
import { Message } from 'semantic-ui-react';

const MessageItem = (props) => {
    const { sender, content, date, username } = props;
    let messageType;
    let color;
    let header = <React.Fragment />;
    let compact = true;
    if (sender === username) {
        messageType = 'sentMessage';
        const sender = '';
        color='white'
    } else if (sender === 'HOST-SERVER') {
        messageType = 'serverMessage';
        compact = false;
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