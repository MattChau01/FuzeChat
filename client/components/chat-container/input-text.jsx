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

export default function InputText({ addMessage }) {

  const [message, setMessage] = useState('');
  function addAMessage() {
    addMessage({
      message
    });
    setMessage('');
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <div style={styles.textContainer}>
      {/* <textarea style={styles.textarea} rows={6} placeholder="Write message here..." value={message} onChange={e => setMessage(e.target.value)} />
      <button onClick={() => addAMessage()} style={styles.button}>SEND</button> */}

      <form onSubmit={handleSubmit}>
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
