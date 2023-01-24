import React, { useEffect, useState } from 'react';
import socketIOClient from 'socket.io-client';
import ChatBoxReceiver, { ChatBoxSender } from './chat-box';
import InputText from './input-text';
// import NewUserName from '../username';

export default function ChatContainer(props) {

  const socketio = socketIOClient('http://localhost:3000');
  const [chats, setChats] = useState([]);
  const [user, setUser] = useState(('user'));

  useEffect(() => {
    socketio.on('chat', senderChats => {
      setChats(senderChats);
    });
  });

  function sendChatToSocket(chat) {
    socketio.emit('chat', chat);
  }

  function addMessage(chat) {
    const newChat = { ...chat, user };
    setChats([...chats, newChat]);
    sendChatToSocket([...chats, newChat]);
  }

  function logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('avatar');
    setUser('');
  }

  function ChatsLists() {
    return chats.map((chat, index) => {
      if (chat.user === user) {
        return <ChatBoxSender key={index} message={chat.message} user={props.user} />;
      }
      return <ChatBoxReceiver key={index} message={chat.message} user={props.user} />;
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
      } */}

      {/* TEST WITH THIS ONE: */}

      <div>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <h4 style={{ margin: 10, color: '#fff' }}>
            Username: {props.user}
          </h4>

          {/* Will need to refactor this button to the icon */}
          <p onClick={() => logout()} style={{ margin: 10, color: '#fff', cursor: 'pointer', backgroundColor: '#FF7376', padding: 10, borderRadius: '1rem' }}>
            Log out
          </p>

        </div>
        <ChatsLists />
        <InputText addMessage={addMessage} />
      </div>

      {/* TEST TEXT
      <div ><p style={{ color: '#fff' }}>TEST</p></div> */}

    </div>
  );
}
