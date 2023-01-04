import React from 'react';

import RoomName from './chat room components/room-name';
import ChatBox from './chat room components/chat-box';
import Sender from './chat room components/sender';

export default class ChatRoom extends React.Component {
  render() {
    return (
      <>
        <RoomName />
        <ChatBox />
        <Sender />
      </>
    );
  }
}
