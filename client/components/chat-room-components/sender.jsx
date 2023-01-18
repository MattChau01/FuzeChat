// import React from 'react';

import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

import Messages from './message';

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
  const [message, setMessage] = useState('');
  const [messageReceived, setMessageReceived] = useState('');

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
    socket.on('receive_message', data => {
      setMessageReceived(data.message);
    });
  });

  // PASTED FROM COMMIT: Update server/index.js to make a POST request to upload each message…

  // componentDidMount() {
  //   this.socket.emit('message', {
  //     type: 'user-join',
  //     text: `User ${this.props.userName} has joined`
  //   });

  //   this.socket.on('message', newMessage => {
  //     // console.log('newMessage: ', newMessage);
  //     this.setState({
  //       messages: [
  //         ...this.state.messages,
  //         newMessage
  //       ]
  //     });
  //   });
  // }

  // componentWillUnmount() {
  //   this.socket.close();
  // }

  // PASTED FROM COMMIT ABOVE: Update server/index.js to make a POST request to upload each message…

  // render() {
  //   const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  //   return (
  //     <>
  //       <div className='chat-box mt-3'>
  //         <div className='text-center'>
  //           <p className='wht-txt pt-1 welcome-to-chat'>Welcome to the chatroom!</p>
  //         </div>
  //         <div id='messages'>
  //           <div className='row'>
  //             <p className='col wht-txt px-4 bolded'>{this.props.userName} has joined!</p>
  //             <p className='col-3 wht-txt bolded'>{time}</p>
  //           </div>
  //           <div className='wht-txt px-3 message'>
  //             <p onSubmit={this.props.handleSubmit} />
  //           </div>
  //         </div>
  //       </div>
  //       <div className='message-area text-center'>
  //         <div className='mt-3'>
  //           <div>
  //             <form onSubmit={this.props.handleSubmit}>
  //               <label htmlFor='message' className='text-box'>
  //                 <input autoComplete='off' type='text' name='message' value={this.props.messages} placeholder='Message' className='message-bar' onChange={this.props.handleChange} />
  //                 <button type='submit' className='send'><i className="fa-solid fa-arrow-up send-arrow" /></button>
  //               </label>
  //             </form>
  //           </div>
  //         </div>
  //       </div>
  //     </>
  //   );
  // }

  const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (

    // props.handleChange = event => setMessage(event.target.value)
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
              <Messages newMsg={messageReceived} username={props.userName}/>
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
