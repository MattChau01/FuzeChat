import React, { useEffect, useState } from 'react';
import socketIOClient from 'socket.io-client';
import { ChatBoxReceiver, ChatBoxSender } from './chat-box';
import SendMessage from './send-msg';

// import toast container into component
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

export default function ChatContainer(props) {

  // function disconnected() {
  //   // console.log('toast!');
  //   // console.log('props: ', props);
  //   toast.error('User disconnected!', {
  //     position: 'top-right',
  //     autoClose: 2000,
  //     hideProgressBar: true,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //     draggable: true,
  //     progress: undefined,
  //     theme: 'light'
  //   });
  // }

  const userName = window.location.hash.split('&')[2];
  const socketio = socketIOClient('http://localhost:3000');
  const [chats, setChats] = useState([]);
  const [user] = useState((props.user));

  useEffect(() => {

    socketio.on('chat', senderChats => {
      setChats(senderChats);
      // console.log('senderChats: ', senderChats);
      // NotifyUser();
    });

    // socketio.on('disconnect', () => {
    //   // console.log('disconnected');
    //   // disconnected();
    // });

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

  // function notifyUser() {
  //   toast('Messaged!', {
  //     position: 'top-right',
  //     autoClose: 2000,
  //     hideProgressBar: false,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //     draggable: true,
  //     progress: undefined,
  //     theme: 'light'
  //   });
  // }

  // DUPLICATING UNDERNEATH FOR TEST

  // // // *** DO NOT DELETE ***

  function ChatsLists() {
    return chats.map((chat, index) => {
      if (chat.user === userName) {
        // console.log('current user');
        return <ChatBoxSender key={index} id={Date.now()} message={chat.message} user={chat.user} timeStamp={chat.time} tStamp={chat.timestamp}/>;
      }
      // console.log('other user');
      // notifyUser();
      return <ChatBoxReceiver key={index} id={Date.now()} message={chat.message} user={chat.user} timeStamp={chat.time} tStamp={chat.timestamp} />;
    });

  }

  // function ChatsLists() {
  //   let fromSender = true;
  //   return chats.map((chat, index) => {
  //     if (chat.user === userName) {
  //       // console.log('current user');
  //       fromSender = false;
  //       return <ChatBoxSender key={index} id={Date.now()} message={chat.message} user={chat.user} timeStamp={chat.time} tStamp={chat.timestamp} />;
  //     }
  //     if (fromSender) {
  //       fromSender = true;
  //       // notifyUser();
  //       return (
  //         <>
  //           <ToastContainer />
  //           <ChatBoxReceiver key={index} id={Date.now()} message={chat.message} user={chat.user} timeStamp={chat.time} tStamp={chat.timestamp} />;
  //         </>
  //       );
  //     }
  //     return <ChatBoxReceiver key={index} id={Date.now()} message={chat.message} user={chat.user} timeStamp={chat.time} tStamp={chat.timestamp} />;
  //   });
  // }

  return (
    <>
      {/* <div>
        <div>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
            <p style={{ margin: 10, color: '#fff', backgroundColor: '#283C46' }} className='px-2 py-1' >
              Username: {props.user}
            </p>
          </div>
        </div>
      </div> */}
      {/* <ToastContainer
        position="top-right"
        autoClose={2000}
        // limit={1}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      /> */}
      <div className='mt-3'>
        <div className='chat-list'>
          <div>
            <div style={{ backgroundColor: '#283C46' }} className='scroll-bar mb-3' >
              <ChatsLists />
              {/* // TEST EMPTY DIV FOR AUTOSCROLL */}
              <div>&nbsp;</div>
            </div>
            <SendMessage addMessage={addMessage} handleSubmit={props.handleSubmit} currentRoom={props.currentRoom} userName={props.userName} />
          </div>
        </div>
      </div>
      {/* <ToastContainer /> */}
    </>
  );
}
