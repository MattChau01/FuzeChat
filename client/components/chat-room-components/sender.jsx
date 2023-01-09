import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:3000');

export default function Sender(props) {

  const [message, setMessage] = useState('');
  const [messageReceived, setMessageReceived] = useState('');

  const handleSend = () => {
    socket.emit('send_message', {
      message
    });
  };

  useEffect(() => {
    socket.on('receive_message', data => {
      setMessageReceived(data.message);
    });
  });

  return (
    <div className='message-area text-center'>
      <div className='mt-3'>
        <div>
          <form onSubmit={props.handleSubmit}>
            <label htmlFor='message' className='text-box'>
              <input type='text' name='message' value={message} placeholder='Message' className='message-bar' onChange={event => setMessage(event.target.value)} />
              <button type='submit' className='send' onClick={handleSend}><i className="fa-solid fa-arrow-up send-arrow" /></button>
              <p className='wht-txt'>{messageReceived}</p>
            </label>
          </form>
        </div>
      </div>
    </div>
  );

}
