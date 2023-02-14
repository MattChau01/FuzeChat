import React, { useEffect, useState } from 'react';
import socketIOClient from 'socket.io-client';
import { ChatBoxReceiver, ChatBoxSender } from './chat-box';
import SendMessage from './send-msg';
import { NotifyBox } from './notification';
// TESTING AUDIO FILE HERE
// import newMessage from '../../../server/public/newMessage.mp3';

export default function ChatContainer(props) {

  const userName = window.location.hash.split('&')[2];
  const socketio = socketIOClient('http://localhost:3000');
  const [chats, setChats] = useState([]);
  const [user] = useState((props.user));
  const [notice] = useState(<NotifyBox />);

  const [listOfUsers, updateList] = useState({});

  useEffect(() => {

    socketio.on('chat', senderChats => {
      setChats(senderChats);
      updateList(senderChats);
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
    NewNotif();
    return chats.map((chat, index) => {
      if (chat.user === userName) {
        return <ChatBoxSender key={index} id={Date.now()} message={chat.message} user={chat.user} timeStamp={chat.time} tStamp={chat.timestamp}/>;
      }
      return <ChatBoxReceiver key={index} id={Date.now()} message={chat.message} user={chat.user} timeStamp={chat.time} tStamp={chat.timestamp} />;
    });
  }

  function NewNotif() {
    if (listOfUsers.length > 0) {
      if (listOfUsers[listOfUsers.length - 1].user !== userName) {
        return (
          <div>
            {notice}
          </div>
        );
      } else {
        return (
          <div>
            &nbsp;
          </div>
        );
      }
    }

  }

  return (
    <div className='mt-3'>
      <div className='chat-list'>
        <div>
          <div style={{ backgroundColor: '#283C46' }} className='scroll-bar mb-3' >
            <ChatsLists />
          </div>
          <div>
            {(listOfUsers.length > 0) ? <NewNotif /> : (<div>&nbsp;</div>)}
          </div>
          <div className='mt-3'>
            <SendMessage addMessage={addMessage} handleSubmit={props.handleSubmit} currentRoom={props.currentRoom} userName={props.userName} />
          </div>
        </div>
      </div>
    </div>
  );
}
