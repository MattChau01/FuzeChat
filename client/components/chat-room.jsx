import React from 'react';
import RoomName from './chat-room-components/room-name';
// import ChatBox from './chat-room-components/chat-box';
// import Sender from './chat-room-components/sender';
import FindRoom from '../lib/select-room';
import NewUser from '../lib/print-username';

// REFACTOR TEST
import ChatContainer from './chat-container/chat-container';

export default class ChatRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      messages: [],
      currentRoom: FindRoom(window.location.hash),
      userName: NewUser(window.location.hash),
      enteredAt: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    // TEST
    this.getTimeStamp = this.getTimeStamp.bind(this);
  }

  // componentDidMount() {

  //   fetch('api/usersInChat')
  //     .then(res => res.json())
  //     .then(time => {
  //       console.log('time', time);
  //       this.setState({
  //         enteredAt: time
  //       });
  //     })
  //     .catch(err => console.error(err));

  //   console.log('enteredAt: ', this.state.enteredAt);
  // }

  // GET REQUEST FOR TIMESTAMP

  getTimeStamp() {
    // console.log(this.state.messages);
    fetch('/api/usersInChat')
      .then(res => res.json())
      .then(time => {
        // console.log('time:', time.joinedChatAt);
        this.setState({
          enteredAt: time.joinedChatAt
        });
        // console.log('time:', this.state.enteredAt);
      })
      .catch(err => console.error(err));

    // console.log('enteredAt: ', this.state.enteredAt);
  }

  componentDidMount() {
    this.getTimeStamp();
  }

  handleChange(event) {
    this.setState({
      messages: event.target.value
    });

  }

  // no londer needed: submit handled in send=msg.jsx
  handleSubmit(event) {
    event.preventDefault();
    this.getTimeStamp();
    // eslint-disable-next-line
    console.log('message to send: ', this.state.messages);

    const reqObj = {
      newMessage: this.state.messages,
      chatRoomName: this.state.currentRoom,
      userName: this.state.userName
    };

    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(reqObj)
    };

    fetch('/api/messages', req)
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
    // console.log('current room: ', this.state.currentRoom);

    return (
      <div className='d-flex align-items-center justify-content-center overflow-hidden'>
        <div>
          <RoomName currentRoom={this.state.currentRoom}/>
          {/* <ChatBox messages={this.state.messages} handleSubmit={this.handleSubmit} userName={this.state.userName}/> */}

          {/* Will be commenting Sender component to start test refactoring */}
          {/* <Sender messages={this.state.messages} handleChange={this.handleChange} handleSubmit={this.handleSubmit} userName={this.state.userName} /> */}

          {/* Refactored components */}
          <ChatContainer user={this.state.userName} currentRoom={this.state.currentRoom} userName={this.state.userName} />
        </div>
      </div>
    );
  }
}
