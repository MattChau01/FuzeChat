import React from 'react';

// import React, { useEffect, useState } from 'react';
// import io from 'socket.io-client';

// const socket = io.connect('http://localhost:3000');
export default class ChatBox extends React.Component {

  // const [message, setMessage] = useState('');
  // const [messageReceived, setMessageReceived] = useState('');

  // const handleSend = () => {
  // console.log('useeffect');

  // setMessage(props.messages);
  // socket.emit('send_message', {
  //   message
  // });
  // };

  // useEffect(() => {
  //   socket.on('receive_message', data => {
  //     setMessageReceived(data.message);
  //   });
  // });

  render() {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    return (
      <div className='chat-box mt-3'>
        <div className='text-center'>
          <p className='wht-txt pt-1 welcome-to-chat'>Welcome to the chatroom!</p>
        </div>
        <div id='messages'>
          <div className='row'>
            <p className='col wht-txt px-4 bolded'>{this.props.userName} has joined!</p>
            <p className='col-3 wht-txt bolded'>{time}</p>
          </div>
          <div className='wht-txt px-3 message'>
            <p onSubmit={this.props.handleSubmit} />
          </div>
        </div>
      </div>
    );
  }
}
