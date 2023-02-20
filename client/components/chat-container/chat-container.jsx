import React, { useEffect, useState } from 'react';
import socketIOClient from 'socket.io-client';
import { ChatBoxReceiver, ChatBoxSender } from './chat-box';
import SendMessage from './send-msg';
import { NotifyBox } from './notification';
// importing modal here
import { EditModal } from './edit-modal';

export default function ChatContainer(props) {

  const userName = window.location.hash.split('&')[2];
  const socketio = socketIOClient('http://localhost:3000');
  const [chats, setChats] = useState([]);
  const [user] = useState((props.user));
  const [notice] = useState(<NotifyBox />);
  const [listOfUsers, updateList] = useState({});
  const [editModal, setEditModal] = useState(false);
  // TESTING PROPS PASS
  // Need to pass `setMsgEdit` inside the edit modal component *****
  const [msgEdit, setMsgEdit] = useState('');
  const [editStatus, setEditStatus] = useState(false);
  // UPDATED MESSAGE
  const [updatedMsg, setUpdatedMsg] = useState('TEST');

  const [chat, setChat] = useState([]);

  useEffect(() => {

    socketio.on('chat', senderChats => {
      setChats(senderChats);
      updateList(senderChats);
    });

  }, [socketio]);

  function sendChatToSocket(chat) {
    socketio.emit('chat', chat);
  }

  // const [msgID, setMsgID] = useState(0);

  // TESTING ON FUNCTION
  function addMessage(chat) {

    fetch('/api/messages')
      .then(res => res.json())
      .then(data => {

        // console.log('data: ', data[0]);

        const timestamp = data[0].timestamp;
        const userId = data[0].userId;
        const entryId = data[0].entryId;
        // TEST
        // const newMessage = data[0].newMessage;

        // Adding a ID

        const newChat = { ...chat, user, timestamp, userId, entryId };
        // console.log('newChat: ', newChat);
        setChats([...chats, newChat]);
        sendChatToSocket([...chats, newChat]);

        // console.log('chats: ', chats);
      })
      .catch(err => console.error(err));
    // setMsgID(msgID + 1);

    // console.log('msgID: ', msgID);

  }

  function ShowModal() {
    // console.log('modal will be placed here');
    setEditModal(true);

  }

  function HideModal() {
    setEditModal(false);
  }

  function IsEdited() {
    setEditStatus(true);
  }

  function NotEdited() {
    setEditStatus(false);
  }

  function ChatsLists() {

    NewNotif();
    return chats.map((chat, index) => {
      // console.log(`index: ${index} and ${chat.message}`);

      // console.log('chat line 81: ', chat);

      // TEST WITH BUTTON
      function editClick() {
        // **** SHOWS MESSAGE CONTENT *****
        // console.log('button was clicked!');
        // console.log('chat line 98: ', chat);

        // setEdit(true);
        setMsgEdit(chat.message);
        setChat(chat);

        ShowModal();
        // console.log('msg value: ', msgEdit);
        // conditional show modal:
        // console.log('status of edit: ', edit);

        // <EditModal chat={chat} />;

      }

      if (chat.user === userName) {
        // <EditModal chat={chat} />;
        return <ChatBoxSender
          key={index}
          id={Date.now()}
          chat={chat}
          message={chat.message}
          user={chat.user}
          timeStamp={chat.time}
          tStamp={chat.timestamp}
          editClick={editClick}
          NotEdited={NotEdited}
          editStatus={editStatus}
          updatedMsg={updatedMsg}
        />;
      }
      return <ChatBoxReceiver
        key={index}
        id={Date.now()}
        chat={chat}
        message={chat.message}
        user={chat.user}
        timeStamp={chat.time}
        tStamp={chat.timestamp}
      />;
    });
  }

  function NewNotif() {
    if (listOfUsers.length > 0) {
      if (listOfUsers[listOfUsers.length - 1].user !== userName) {
        return (
          <div>
            {notice}
          </div>
        );
      } else {
        return (
          <div>
            &nbsp;
          </div>
        );
      }
    }
  }

  // const [modal, setModal] = useState(false);

  // console.log('editModal: ', editModal);
  // console.log('updatedMsg: ', updatedMsg);

  return (
    <div className='mt-3'>
      <div className='chat-list'>
        <div>
          <div style={{ backgroundColor: '#283C46' }} className='scroll-bar mb-3' >
            <ChatsLists />
            {/* PASTE MODAL HERE */}
            {/* <EditModal /> */}
            {(editModal === true)
              ? <EditModal
                HideModal={HideModal}
                msgEdit={msgEdit}
                chat={chat}
                editStatus={editStatus}
                IsEdited={IsEdited}
                updatedMsg={ word => setUpdatedMsg(word) }
                />
              : <div>&nbsp;</div> }
          </div>
          <div>
            {(listOfUsers.length > 0) ? <NewNotif /> : (<div>&nbsp;</div>)}
          </div>
          <div className='mt-3'>
            <SendMessage
              addMessage={addMessage}
              handleSubmit={props.handleSubmit}
              currentRoom={props.currentRoom}
              userName={props.userName}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
