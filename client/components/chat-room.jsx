import React from 'react';

import RoomName from './chat room components/room-name';
import ChatBox from './chat room components/chat-box';
import Sender from './chat room components/sender';

export default class ChatRoom extends React.Component {
  render() {
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
