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
    setInterval(newMessage(), 2000);

    clearInterval(newMessage);
  }

  function newMessage() {
    return (
      <div>TEST!</div>
    );
  }

  return (
    <>
      <div>
        {/* <div className='mb-3 d-flex justify-content-center'>
          <div className='text-center' style={{ backgroundColor: 'rgb(210, 224, 231, 100%)', width: '50%' }}>
            <i style={{ color: 'rgb(2, 175, 160, 100%)' }} className="fa-solid fa-chevron-up" /> &nbsp; <strong>New Message!</strong>
          </div>
        </div> */}
      </div>
      <div style={styles.textContainer}>
        <form onSubmit={formSubmit}>
          <label htmlFor='message' className='text-box'>
            <input autoComplete='off' type='text' name='message' value={message} placeholder='Message' className='message-bar'
            onChange={e => { setMessage(e.target.value); }} />
            <button type='submit' className='send' onClick={() => {
              addAMessage();
            }}><i className="fa-solid fa-arrow-up" style={styles.sendArrow} /></button>
          </label>
        </form>
      </div>
    </>
  );
}
