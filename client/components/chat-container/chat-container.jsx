import React, { useEffect, useState } from 'react';
import socketIOClient from 'socket.io-client';
import { ChatBoxReceiver, ChatBoxSender } from './chat-box';
import SendMessage from './send-msg';

// import test notification component
import { NotifyBox } from './notification';

// import toast container into component
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// TEST PASSING VAR AS PROPS (WORKS)
// const interval = <NotifyBox />;
// TEST USE STATE WITH INTERVAL ABOVE ON LINE 38

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
  const [notice] = useState(<NotifyBox />);

  // TEST use state (WORKS)
  const [listOfUsers, updateList] = useState({});

  useEffect(() => {

    socketio.on('chat', senderChats => {
      setChats(senderChats);
      updateList(senderChats);
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
    NewNotif();
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

  function NewNotif() {

    // console.log('listOfUsers: ', listOfUsers);
    // console.log('index of one: ', listOfUsers[listOfUsers.length - 1]);
    // console.log('index of one: ', listOfUsers[listOfUsers.length - 1].user);

    if (listOfUsers.length > 0) {
      // ADDED VAR TO TOP OF PAGE
      // const interval = <NotifyBox />;

      // const interval = setInterval(() => {
      //   // return <NotifyBox />;
      //   return (
      //     <div className='wht-txt'>
      //       AGAIN
      //     </div>
      //   );
      // }, 2000);
      if (listOfUsers[listOfUsers.length - 1].user !== userName) {
        // return (
        //   <NotifyBox />
        // );

        // interval();
        // clearInterval(interval);
        // return interval;
        // return (setInterval(interval, 2000));
        return (
          <div>
            {/* {setInterval(interval, 2000)} */}
            {/* {interval} */}
            {notice}
            {/* {console.log('interval: ', interval)} */}
            {/* {clearInterval(interval)} */}
          </div>
        );
      } else {
        // clearInterval(interval);
        return (
          <div>
            &nbsp;
          </div>
        );
      }
    }

  }

  function UpdateNotice() {
    // console.log('test');
    // setNotice(<div>&nbsp;</div>);
  }

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
              {/* <div>&nbsp;</div> */}
            </div>
            {/* TEST WITH NEW COMPONENT HERE */}
            {/* &nbsp; */}
            {/* <NewNotif /> */}
            <div>
              {(listOfUsers.length > 0) ? <NewNotif /> : (<div>&nbsp;</div>)}
            </div>
            <div className='mt-3'>
              <SendMessage updateNotice={UpdateNotice} addMessage={addMessage} handleSubmit={props.handleSubmit} currentRoom={props.currentRoom} userName={props.userName} />
            </div>
          </div>
        </div>
      </div>
      {/* <ToastContainer /> */}
    </>
  );
}
