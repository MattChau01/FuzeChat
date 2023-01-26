import React from 'react';
import RoomName from './chat-room-components/room-name';
import FindRoom from '../lib/select-room';
import NewUser from '../lib/print-username';
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
    // this.getTimeStamp = this.getTimeStamp.bind(this);
  }

  // getTimeStamp() {
  //   fetch('/api/usersInChat')
  //     .then(res => res.json())
  //     .then(time => {
  //       this.setState({
  //         enteredAt: time.joinedChatAt
  //       });
  //     })
  //     .catch(err => console.error(err));
  // }

  componentDidMount() {
    // this.getTimeStamp();

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
    // .then(data => console.log(data));
    // window.location.hash = 'message';
  }

  handleChange(event) {
    this.setState({
      messages: event.target.value
    });

  }

  render() {

    return (
      <div className='d-flex align-items-center justify-content-center overflow-hidden'>
        <div>
          <RoomName currentRoom={this.state.currentRoom}/>
          <ChatContainer user={this.state.userName} currentRoom={this.state.currentRoom} userName={this.state.userName} />
        </div>
      </div>
    );
  }
}
