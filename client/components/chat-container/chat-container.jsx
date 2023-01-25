import React, { useEffect, useState } from 'react';
import socketIOClient from 'socket.io-client';
import ChatBoxReceiver, { ChatBoxSender } from './chat-box';
import InputText from './input-text';
// import NewUserName from '../username';

export default function ChatContainer(props) {

  // console.log(window.location.hash.split('&')[2]);
  const userName = window.location.hash.split('&')[2];

  const socketio = socketIOClient('http://localhost:3000');
  const [chats, setChats] = useState([]);
  // BELOW WORKS, commenting out to test local storage
  const [user] = useState((props.user));

  // const [user, setUser] = useState(localStorage.getItem('user'));

  // console.log(user);

  useEffect(() => {
    socketio.on('chat', senderChats => {
      setChats(senderChats);
    });
  });

  function sendChatToSocket(chat) {
    socketio.emit('chat', chat);
    // console.log('line 29 ', chat);
  }

  const msgIndex = Date.now();

  function addMessage(chat) {
    const newChat = { ...chat, user, msgIndex };
    setChats([...chats, newChat]);
    sendChatToSocket([...chats, newChat]);
    // msgIndex = msgIndex + 1;
  }

  // function logout() {
  //   localStorage.removeItem('user');
  //   localStorage.removeItem('avatar');
  //   setUser('');
  // }

  function ChatsLists() {
    return chats.map((chat, index) => {
      // console.log('chat: ', chat);
      // console.log('chat.user: ', chat.user);
      // console.log('line 46', chat);
      if (chat.user === userName) {
        return <ChatBoxSender key={index} id={Date.now()} message={chat.message} user={chat.user} />;
      }
      return <ChatBoxReceiver key={index} id={Date.now()} message={chat.message} user={chat.user} />;
    });
  }

  return (
    <div>
      {/* {user
        ? <div>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <h4 style={{ margin: 10, color: '#fff' }}>
              Username: {props.user}
            </h4>
            <p onClick={() => logout()} style={{ margin: 10, color: '#fff', cursor: 'pointer', backgroundColor: '#FF7376', padding: 10, borderRadius: '1rem' }}>
              Log out
            </p>
          </div>
          <ChatsLists />
          <InputText addMessage={addMessage} />
        </div>
        : <NewUserName setUser={setUser} user={user} />
      }
 */}
      {/* TEST WITH THIS ONE: */}

      <div>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <h4 style={{ margin: 10, color: '#fff' }}>
            Username: {props.user}
          </h4>

          {/* Will need to refactor this button to the icon */}
          {/* <p onClick={() => logout()} style={{ margin: 10, color: '#fff', cursor: 'pointer', backgroundColor: '#FF7376', padding: 10, borderRadius: '1rem' }}>
            Log out
          </p> */}

        </div>
        <ChatsLists />
        <InputText addMessage={addMessage} handleSubmit={props.handleSubmit}/>
      </div>

      {/* TEST TEXT
      <div ><p style={{ color: '#fff' }}>TEST</p></div> */}

    </div>
  );
}
