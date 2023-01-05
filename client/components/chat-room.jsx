import React from 'react';

import RoomName from './chat room components/room-name';
import ChatBox from './chat room components/chat-box';
import Sender from './chat room components/sender';

// import enterChat from '../../server/public/enterChat.mp3';

export default class ChatRoom extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.playChime = this.playChime.bind(this);
  // }

  // playChime() {
  //   new Audio(enterChat).play();
  // }

  render() {
    // window.onload = function () {
    //   enterChat.play();
    // };
    return (
      <div className='d-flex align-items-center justify-content-center overflow-hidden'>
        <div>
          <RoomName />
          <ChatBox />
          <Sender />
        </div>
      </div>
    );
  }
}
