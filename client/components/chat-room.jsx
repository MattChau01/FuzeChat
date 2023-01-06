import React from 'react';

import RoomName from './chat room components/room-name';
import ChatBox from './chat room components/chat-box';
import Sender from './chat room components/sender';
import FindRoom from '../lib/select-room';
import NewUser from '../lib/print-username';

export default class ChatRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      currentRoom: FindRoom(window.location.hash),
      userName: NewUser(window.location.hash)
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      messages: event.target.value
    });
  }

  // working on submitting and appending to page
  handleSubmit(event) {
    event.preventDefault();
    // eslint-disable-next-line
    console.log('message to send: ', this.state.messages);
    return (
      this.state.messages
    );
  }

  render() {
    return (
      <div className='d-flex align-items-center justify-content-center overflow-hidden'>
        <div>
          <RoomName currentRoom={this.state.currentRoom}/>
          <ChatBox messages={this.state.messages} handleSubmit={this.handleSubmit} userName={this.state.userName}/>
          <Sender messages={this.state.messages} handleChange={this.handleChange} handleSubmit={this.handleSubmit} />
        </div>
      </div>
    );
  }
}
