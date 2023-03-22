import React from 'react';
import RoomName from './chat-container/room-name';
import FindRoom from '../lib/select-room';
import NewUser from '../lib/print-username';
import ChatContainer from './chat-container/chat-container';
// import Modal from '../components/modal-popup';

export default class ChatRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      currentRoom: FindRoom(window.location.hash),
      userName: NewUser(window.location.hash),
      cancelClick: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.cancelButton = this.cancelButton.bind(this);
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
      .then(res => res.json())
      .catch(err => console.error(err));
  }

  cancelButton() {

  }

  handleChange(event) {
    this.setState({
      messages: event.target.value
    });
  }

  render() {
    return (
      <div className='d-flex align-items-center justify-content-center'>
        <div style={{ width: '90%' }} >
          <RoomName currentRoom={this.state.currentRoom}/>
          {/* <Modal /> */}
          <ChatContainer user={this.state.userName} currentRoom={this.state.currentRoom} userName={this.state.userName}/>
        </div>
      </div>
    );
  }
}
