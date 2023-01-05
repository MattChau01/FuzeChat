import React from 'react';
import NewUser from '../../lib/print-username';

export default class ChatBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: NewUser(window.location.hash)
    };
  }

  render() {
    // console.log('username: ', this.state.userName);
    // console.log('another split: ', (this.state.userName).split('='));

    return (
      <div className='chat-box mt-3'>
        <div className='text-center'>
          <p className='wht-txt pt-1 welcome-to-chat'>Welcome to the chatroom!</p>
        </div>
        <div id='messages'>
          <div className='row'>
            <p className='col wht-txt px-4 bolded'>{this.state.userName} has joined!</p>
            <p className='col-3 wht-txt bolded'>12:30 PM</p>
          </div>
          <div className='wht-txt px-3 message'>
            <p>This is a test for a really really reaaaally long message from a test user!!!</p>
          </div>
        </div>
      </div>
    );
  }
}
