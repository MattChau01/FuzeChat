import React from 'react';

export default function ChatBoxReceiver(props, { user, message }) {

  const date = new Date();
  const hour = date.getHours();
  const minutes = date.getMinutes();

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'flex-start',
      flexDirection: 'row',
      margin: 5
    }}>
      <p style={{
        padding: 10,
        backgroundColor: '#dcf8c6',
        borderRadius: 10,
        maxWidth: '60%'
      }}>
        <div className='row'>
          <div className='col'>
            <strong style={{ fontSize: 16, color: 'black' }}>
              {props.user}
            </strong>
          </div>
          <div className='col pt-1' style={{ textAlign: 'end', fontSize: 12 }}>
            {`${hour}:${minutes}`}
          </div>
        </div>
        {props.message}
      </p>
    </div>
  );
}

export function ChatBoxSender(props, { user, message }) {

  const date = new Date();
  const hour = date.getHours();
  const minutes = date.getMinutes();

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'flex-end',
      flexDirection: 'row',
      margin: 5
    }}>
      <p style={{
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        maxWidth: '60%'
      }}>
        <div className='row'>
          <div className='col'>
            <strong style={{ fontSize: 16, color: 'black' }}>
              {props.user}
            </strong>
          </div>
          <div className='col pt-1' style={{ textAlign: 'end', fontSize: 12 }}>
            {`${hour}:${minutes}`}
          </div>
        </div>
        {props.message}
      </p>
    </div>
  );
}
