import React, { useState } from 'react';

const styles = {
  button: {
    width: '10%',
    height: 50,
    fontWeight: 'bold',
    borderRadius: 10,
    fontSize: 18,
    backgroundColor: '#34b7f1',
    borderWidth: 0,
    color: '#fff'
  },
  textarea: {
    width: '60%',
    height: 50,
    borderRadius: 10,
    borderWidth: 0,
    padding: 10,
    fontSize: 18
  },
  textContainer: {
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  sendArrow: {
    color: '#fff',
    fontSize: 20
  }
};

export default function SendMessage(props) {
  const [message, setMessage] = useState('');
  function addAMessage() {
    props.addMessage({
      message
    });

    const reqObj = {
      newMessage: message,
      chatRoomName: props.currentRoom,
      userName: props.userName
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
        setMessage('');
      });
    setMessage('');
  }

  function formSubmit(event) {
    event.preventDefault();
  }

  return (
    <div style={styles.textContainer}>
      <form onSubmit={formSubmit}>
        <label htmlFor='message' className='text-box'>
          <input autoComplete='off' type='text' name='message' value={message} placeholder='Message' className='message-bar' onChange={e => setMessage(e.target.value)} />
          <button type='submit' className='send' onClick={() => {
            addAMessage();
          }}><i className="fa-solid fa-arrow-up" style={styles.sendArrow} /></button>
        </label>
      </form>
    </div>
  );
}
