import React, { useEffect, useState } from 'react';
import socketIOClient from 'socket.io-client';
import ChatBoxReceiver, { ChatBoxSender } from './chat-box';
import SendMessage from './send-msg';

export default function ChatContainer(props) {

  const userName = window.location.hash.split('&')[2];
  const socketio = socketIOClient('http://localhost:3000');
  const [chats, setChats] = useState([]);
  const [user] = useState((props.user));

  // TEST usestate on timestamp
  // const date = new Date();
  // const [timeStamp] = useState((date.toLocaleTimeString().slice(0, 4)) + ' ' + (date.toLocaleTimeString().slice(8)));

  // const [time, setTime] = useState('');
  // const getTime = () => {
  //   fetch('/api/messages')
  //     .then(res => res.json())
  //     .then(data => {
  //       setTime(data[0].timestamp);
  //       // setTime(timeStamp);
  //     })
  // };

  // TESTING HERE
  // STARTING POINT FOR TEST
  /// ///

  /// ///
  // fetch('/api/messages')
  //   .then(res => res.json())
  //   .then(data => {
  //     setTime(data[0].timestamp);

  //     // setTime(timeStamp);

  //   })

  // TEST ABOVE

  useEffect(() => {

    // getTime();

    // document.title = `current timestamp: ${time}`;

    socketio.on('chat', senderChats => {
      setChats(senderChats);
    });
  }, [socketio]);

  function sendChatToSocket(chat) {
    socketio.emit('chat', chat);
  }

  // const msgIndex = Date.now();

  // DO NOT DELETE BELOW:
  function addMessage(chat) {
    // const timestamp = new Date().toLocaleTimeString('en-US', {
    //   hour: '2-digit', minute: '2-digit', timeZone: 'America/Los_Angeles'
    // });
    // const newChat = { ...chat, user, timestamp };
    // setChats([...chats, newChat]);
    // sendChatToSocket([...chats, newChat]);

    fetch('/api/messages')
      .then(res => res.json())
      .then(data => {
        const timestamp = data[0].timestamp;
        const newChat = { ...chat, user, timestamp };
        setChats([...chats, newChat]);
        sendChatToSocket([...chats, newChat]);
        // setTime(timeStamp);

      })
      .catch(err => console.error(err));

  }
  // DO NOT DELETE ABOVE:

  function ChatsLists() {

    // const date = new Date();
    // const stamp = (date.toLocaleTimeString().slice(0, 5)) + ' ' + (date.toLocaleTimeString().slice(8));
    return chats.map((chat, index) => {
      // getTime();

      if (chat.user === userName) {
        return <ChatBoxSender key={index} id={Date.now()} message={chat.message} user={chat.user} timeStamp={chat.time} tStamp={chat.timestamp}/>;
      }
      return <ChatBoxReceiver key={index} id={Date.now()} message={chat.message} user={chat.user} timeStamp={chat.time} tStamp={chat.timestamp} />;
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
