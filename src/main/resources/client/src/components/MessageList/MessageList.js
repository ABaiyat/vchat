import React from 'react';
import MessageItem from '../MessageItem/MessageItem';

const MessageList = (props) => {
    const { messages, username } = props;
    const messageList = messages.map((message) => {
        return (
            <MessageItem sender={message.sender} content={message.content} username={username}/>
        )
    });
    return (<div>{messageList}</div>)

};

export default MessageList;