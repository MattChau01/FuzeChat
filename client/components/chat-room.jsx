import React from 'react';
import RoomName from './chat-container/room-name';
import FindRoom from '../lib/select-room';
import NewUser from '../lib/print-username';
import ChatContainer from './chat-container/chat-container';
import Modal from '../components/modal-popup';

export default class ChatRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      currentRoom: FindRoom(window.location.hash),
      userName: NewUser(window.location.hash),
      exitClick: false,
      confirmClick: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.exitButton = this.exitButton.bind(this);
    this.cancelClick = this.cancelClick.bind(this);
    this.confirmClick = this.confirmClick.bind(this);
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

  exitButton() {

    this.setState({
      exitClick: true
    });

  }

  cancelClick() {

    this.setState({
      exitClick: false
    });

  }

  confirmClick() {

    window.location.hash = '#';

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
          <RoomName currentRoom={this.state.currentRoom} exitButton={this.exitButton}/>
          <ChatContainer user={this.state.userName} currentRoom={this.state.currentRoom} userName={this.state.userName} exitClick={this.state.exitClick} />
          {(this.state.exitClick === true) ? <Modal cancelClick={this.cancelClick} confirmClick={this.confirmClick} /> : null}
        </div>
      </div>
    );
  }
}
