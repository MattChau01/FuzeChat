import React, { useState } from 'react';

const styles = {
  button: {
    width: '10%',
    height: '3.125rem',
    fontWeight: 'bold',
    borderRadius: 10,
    fontSize: '1rem',
    backgroundColor: '#34b7f1',
    borderWidth: 0,
    color: '#fff'
  },
  textarea: {
    width: '60%',
    height: '3.125rem',
    borderRadius: 10,
    borderWidth: 0,
    padding: '0.5rem',
    fontSize: '1rem'
  },
  textContainer: {
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  sendArrow: {
    color: '#fff',
    fontSize: '1rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: '0.2rem'
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
        <label htmlFor='message' className='text-box' onClick={props.updateNotice}>
          <input autoComplete='off' type='text' name='message' value={message} placeholder='Message' className='message-bar'
            onChange={e => {
              setMessage(e.target.value);
            }} />
          <button type='submit' className='send' onClick={() => {
            addAMessage();
          }}><i className="fa-solid fa-paper-plane" style={styles.sendArrow} /></button>
        </label>
      </form>
    </div>
  );
}
