import React from 'react';
import RoomName from './chat-room-components/room-name';
import FindRoom from '../lib/select-room';
import NewUser from '../lib/print-username';
import ChatContainer from './chat-container/chat-container';

export default class ChatRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      currentRoom: FindRoom(window.location.hash),
      userName: NewUser(window.location.hash)
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const reqObj = {};
    reqObj.chatRoomName = this.state.currentRoom;
    reqObj.userName = this.state.userName;

    const req = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(reqObj)
    };

    fetch('/api/usersInChat', req)
      .then(res => res.json());
  }

  handleChange(event) {
    this.setState({
      messages: event.target.value
    });
  }

  render() {
    return (
      <div className='d-flex align-items-center justify-content-center'>
        <div>
          <RoomName currentRoom={this.state.currentRoom}/>
          <ChatContainer user={this.state.userName} currentRoom={this.state.currentRoom} userName={this.state.userName}/>
        </div>
      </div>
    );
  }
}
