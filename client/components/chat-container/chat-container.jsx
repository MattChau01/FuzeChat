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
  }, [socketio]);

  function sendChatToSocket(chat) {
    socketio.emit('chat', chat);
  }

  function addMessage(chat) {
    fetch('/api/messages')
      .then(res => res.json())
      .then(data => {
        const timestamp = data[0].timestamp;
        const newChat = { ...chat, user, timestamp };
        setChats([...chats, newChat]);
        sendChatToSocket([...chats, newChat]);
      })
      .catch(err => console.error(err));
  }

  function ChatsLists() {
    return chats.map((chat, index) => {
      if (chat.user === userName) {
        return <ChatBoxSender key={index} id={Date.now()} message={chat.message} user={chat.user} timeStamp={chat.time} tStamp={chat.timestamp}/>;
      }
      return <ChatBoxReceiver key={index} id={Date.now()} message={chat.message} user={chat.user} timeStamp={chat.time} tStamp={chat.timestamp} />;
    });
  }

  return (
    <>
      <div>
        <div>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
            <p style={{ margin: 10, color: '#fff', backgroundColor: '#283C46' }} className='px-2 py-1' >
              Username: {props.user}
            </p>
          </div>
        </div>
      </div>
      <div className='chat-list'>
        <div>
          <div style={{ height: '60vh', minHeight: '63vh', backgroundColor: '#283C46' }} className='scroll-bar mb-3' >
            <ChatsLists />
          </div>
          <SendMessage addMessage={addMessage} handleSubmit={props.handleSubmit} currentRoom={props.currentRoom} userName={props.userName} />
        </div>
      </div>
    </>
  );
}
