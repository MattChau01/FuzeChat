import React, { useEffect, useRef, useState } from 'react';
import socketIOClient from 'socket.io-client';
import { ChatBoxReceiver, ChatBoxSender } from './chat-box';
import SendMessage from './send-msg';
import { NotifyBox } from './notification';

export default function ChatContainer(props) {

  const newest = useRef(null);

  function latestMsg() {
    newest.current?.scrollIntoView({ behavior: 'smooth' });
  }

  const userName = window.location.hash.split('&')[2];

  let socketUrl = 'https://fuzechat.page/';
  if (process.env.NODE_ENV === 'development') {
    socketUrl = 'http://localhost:3000';
  }

  const socketio = socketIOClient(socketUrl);
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
        return <ChatBoxSender key={index} id={Date.now()} message={chat.message} user={chat.user} timeStamp={chat.time} tStamp={chat.timestamp} latestMsg={latestMsg} />;
      }
      return <ChatBoxReceiver key={index} id={Date.now()} message={chat.message} user={chat.user} timeStamp={chat.time} tStamp={chat.timestamp} latestMsg={latestMsg} />;
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
      <div>
        <div>
          <div style={{ backgroundColor: '#283C46' }} className='scroll-bar mb-3' >
            <ChatsLists />
            <div ref={newest} />
          </div>
          <div className='row'>
            <div className='col'>
              {(listOfUsers.length > 0) ? <NewNotif /> : (<div>&nbsp;</div>)}
            </div>
            <div className='col-4 wht-txt text-end' onClick={latestMsg}>
              <div className='latest-msg'>
                <span style={{ cursor: 'pointer' }}>
                  Newest message
                </span>
              </div>
              <a><i className="fa-solid fa-arrow-down" style={{
                cursor: 'pointer',
                fontSize: '1.25rem'
              }} /></a>
            </div>
          </div>
          <div className='mt-2'>
            <SendMessage addMessage={addMessage} handleSubmit={props.handleSubmit} currentRoom={props.currentRoom} userName={props.userName} />
          </div>
        </div>
      </div>
    </div>
  );
}
