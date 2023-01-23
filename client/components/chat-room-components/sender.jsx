// import React from 'react';

import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

import Messages from './messages';

const socket = io.connect('http://localhost:3000');

// export default class Sender extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       value: ''

//     };
//   }

export default function Sender(props) {

  // trying to set props.messages to equal to 'message'
  const [message, setMessage] = useState(props.messages);
  const [messageReceived, setMessageReceived] = useState(props.messages);
  // console.log('message: ', message);
  // console.log('setMessage: ', setMessage);
  // console.log('messageReceived: ', messageReceived);
  // console.log('setMessageReceived: ', setMessageReceived);

  const handleSend = () => {
    // eslint-disable-next-line
    console.log('useeffect');

    setMessage(props.messages);
    // eslint-disable-next-line
    console.log('setMessage: ', setMessage);

    socket.emit('send_message', {
      message
    });
  };

  useEffect(() => {
    // console.log('messageReceived', messageReceived);

    socket.on('receive_message', data => {
      setMessageReceived(data.message);
    });
  });

  // let enteredAt = '';
  // const getTimestamp = () => {

  //   fetch('api/usersInChat')
  //     .then(res => res.json())
  //     .then(time => {
  //       // console.log('time', time.joinedChatAt);
  //       enteredAt = (time.joinedChatAt);
  //       console.log('enteredAt: ', enteredAt);
  //     })
  //     .catch(err => console.error(err));
  //   // console.log('RETURNING enteredAt: ', enteredAt);
  //   return enteredAt;
  // };

  // getTimestamp();
  // console.log('enteredAt: ', enteredAt); // logs an empty string

  const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <>
      <div className='chat-box mt-3'>
        <div className='text-center'>
          <p className='wht-txt pt-1 welcome-to-chat'>Welcome to the chatroom!</p>
        </div>
        <div id='messages'>
          <div className='row'>
            <p className='col wht-txt px-4 bolded'>{props.userName} has joined!</p>
            <p className='col-3 wht-txt bolded'>{time}</p>
          </div>
          <div className='wht-txt px-3 message'>
            <div>
              {/* <p>{props.getTimeStamp}</p> */}
              <Messages newMsg={messageReceived} username={props.userName} />
            </div>
          </div>
        </div>
      </div>
      <div className='message-area text-center'>
        <div className='mt-3'>
          <div>
            <form onSubmit={props.handleSubmit}>
              <label htmlFor='message' className='text-box'>
                <input autoComplete='off' type='text' name='message' value={props.messages} placeholder='Message' className='message-bar' onChange={props.handleChange} />
                <button type='submit' className='send' onClick={handleSend}><i className="fa-solid fa-arrow-up send-arrow" /></button>
              </label>
            </form>
          </div>
        </div>
      </div>
    </>
  );

}
