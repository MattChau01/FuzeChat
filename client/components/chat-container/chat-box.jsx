import React from 'react';

export default function ChatBoxReceiver(props, { user, message }) {

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
        <strong style={{
          fontSize: 13
        }}>
          {props.user}
        </strong><br />
        {props.message}
      </p>
    </div>
  );
}

export function ChatBoxSender(props, { user, message }) {

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
        <strong style={{ fontSize: 13, color: 'black' }}>
          {props.user}
        </strong><br />
        {props.message}
      </p>
    </div>
  );
}
