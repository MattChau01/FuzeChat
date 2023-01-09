import React from 'react';

export default class ChatBox extends React.Component {

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
