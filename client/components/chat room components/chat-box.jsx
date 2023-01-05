import React from 'react';

export default class ChatBox extends React.Component {
  render() {
    return (
      <div className='chat-box mt-3'>
        <div className='text-center'>
          <p className='wht-txt pt-1'>Welcome to the chatroom!</p>
        </div>
        <div id='messages'>
          <div className='row'>
            <p className='col wht-txt px-4 just-joined'>PLACEHOLDER has joined!</p>
            <p className='col-3 wht-txt just-joined'>12:30 PM</p>
          </div>
          <div className='wht-txt px-3 message'>
            <p>This is a test for a really really reaaaally long message from a test user!!!</p>
          </div>
        </div>
      </div>
    );
  }
}
