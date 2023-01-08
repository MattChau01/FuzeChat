import React from 'react';

import RoomName from './chat-room-components/room-name';
import ChatBox from './chat-room-components/chat-box';
import Sender from './chat-room-components/sender';
import FindRoom from '../lib/select-room';
import NewUser from '../lib/print-username';

export default class ChatRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
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

    const reqObj = {
      newMessage: this.state.messages,
      chatRoomName: this.state.currentRoom,
      userName: this.state.userName
    };
    reqObj.newMessage = this.state.messages;
    reqObj.chatRoomName = this.state.currentRoom;
    reqObj.userName = this.state.userName;

    // console.log('value of reqObj: ', reqObj);

    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(reqObj)
    };

    fetch('/api/messages', req)
      // .then(() => console.log('post request handled!'))
      .then(res =>
        res.json()
      )
      .then(data => {
        this.setState({
          messages: this.state.value
        });
      });
  }

  render() {
    // console.log('this.state: ', this.state);
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
