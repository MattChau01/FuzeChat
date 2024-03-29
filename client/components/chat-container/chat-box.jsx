import React, { useEffect } from 'react';
import newMessage from '../../../server/public/newMessage.mp3';

const alert = new Audio(newMessage);

export function ChatBoxReceiver(props, { user, message }) {

  useEffect(() => {
    alert.play();
    props.latestMsg();
  }, [props]);

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'flex-start',
      flexDirection: 'row'
    }} className='mx-3 my-2'>
      <div style={{
        padding: 10,
        backgroundColor: '#dcf8c6',
        borderRadius: 10,
        maxWidth: '70%'
      }}>
        <div className='row'>
          <div className='col'>
            <strong style={{ fontSize: 16, color: 'black' }}>
              {props.user}
            </strong>
          </div>
          <div className='col pt-1' style={{ textAlign: 'end', fontSize: 12 }}>
            {props.tStamp}
          </div>
        </div>
        {props.message}
      </div>
    </div>
  );
}

export function ChatBoxSender(props, { user, message }) {

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'flex-end',
      flexDirection: 'row'
    }} className='mx-2 my-2'>
      <div style={{
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        maxWidth: '70%'
      }}>
        <div className='row'>
          <div className='col'>
            <strong style={{ fontSize: 16, color: 'black' }}>
              {props.user}
            </strong>
          </div>
          <div className='col pt-1' style={{ textAlign: 'end', fontSize: 12 }}>
            {props.tStamp}
          </div>
        </div>
        {props.message}
      </div>
    </div>
  );
}
