import React, { useEffect, useState } from 'react';
import socketIOClient from 'socket.io-client';
import ChatBoxReceiver, { ChatBoxSender } from './chat-box';
import SendMessage from './send-msg';

export default function ChatContainer(props) {

  const userName = window.location.hash.split('&')[2];
  const socketio = socketIOClient('http://localhost:3000');
  const [chats, setChats] = useState([]);
  const [user] = useState((props.user));
  // console.log('current user: ', user);

  // TEST usestate on timestamp
  // const date = new Date();
  // const [timeStamp] = useState((date.toLocaleTimeString().slice(0, 4)) + ' ' + (date.toLocaleTimeString().slice(8)));

  const [time, setTime] = useState('');
  const getTime = () => {
    fetch('/api/messages')
      .then(res => res.json())
      .then(data => {
        setTime(data[0].timestamp);
        // console.log('data: ', data);
        // console.log('updated time: ', time);
      })
      .catch(err => console.error(err));
  };

  useEffect(() => {

    // getTime();

    // console.log('rendered!');

    socketio.on('chat', senderChats => {
      setChats(senderChats);
    });
  });

  function sendChatToSocket(chat) {
    socketio.emit('chat', chat);
  }

  // const msgIndex = Date.now();

  function addMessage(chat) {
    const newChat = { ...chat, user, time };
    setChats([...chats, newChat]);
    sendChatToSocket([...chats, newChat]);
  }

  function ChatsLists() {

    // getTime();

    // console.log('chat-container');
    // const date = new Date();
    // const stamp = (date.toLocaleTimeString().slice(0, 5)) + ' ' + (date.toLocaleTimeString().slice(8));
    // console.log(stamp);
    return chats.map((chat, index) => {

      // console.log('chat: ', chat);

      if (chat.user === userName) {
        return <ChatBoxSender key={index} id={Date.now()} message={chat.message} user={chat.user} timeStamp={chat.time}/>;
      }
      return <ChatBoxReceiver key={index} id={Date.now()} message={chat.message} user={chat.user} timeStamp={chat.time} />;
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
        <SendMessage getTime={getTime} addMessage={addMessage} handleSubmit={props.handleSubmit} currentRoom={props.currentRoom} userName={props.userName} />
      </div>
    </div>
  );
}
