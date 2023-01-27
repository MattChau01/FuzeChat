import React, { useEffect, useState } from 'react';
import socketIOClient from 'socket.io-client';
import ChatBoxReceiver, { ChatBoxSender } from './chat-box';
import SendMessage from './send-msg';

export default function ChatContainer(props) {

  const userName = window.location.hash.split('&')[2];
  const socketio = socketIOClient('http://localhost:3000');
  const [chats, setChats] = useState([]);
  const [user] = useState((props.user));

  useEffect(() => {
    socketio.on('chat', senderChats => {
      setChats(senderChats);
    });
  });

  function sendChatToSocket(chat) {
    socketio.emit('chat', chat);
  }

  const msgIndex = Date.now();

  function addMessage(chat) {
    const newChat = { ...chat, user, msgIndex };
    setChats([...chats, newChat]);
    sendChatToSocket([...chats, newChat]);
  }

  function ChatsLists() {
    // console.log('chat-container');
    return chats.map((chat, index) => {

      if (chat.user === userName) {
        return <ChatBoxSender key={index} id={Date.now()} message={chat.message} user={chat.user} msgTime={props.msgTime}/>;
      }
      return <ChatBoxReceiver key={index} id={Date.now()} message={chat.message} user={chat.user} msgTime={props.msgTime} />;
    });
  }

  return (
    <div>
      <div>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
          <h4 style={{ margin: 10, color: '#fff' }}>
            Username: {props.user}
          </h4>
        </div>
        <ChatsLists />
        <SendMessage addMessage={addMessage} handleSubmit={props.handleSubmit} currentRoom={props.currentRoom} userName={props.userName} />
      </div>
    </div>
  );
}
