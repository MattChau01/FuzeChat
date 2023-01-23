import React from 'react';

export default function ChatBoxReceiver({ user, message }) {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'flex-start',
      flexDirection: 'row'
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
          {user}
        </strong><br />
        {message}
      </p>
    </div>
  );
}

export function ChatBoxSender({ user, message }) {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'flex-end',
      flexDirection: 'row'
    }}>
      <p style={{
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        maxWidth: '60%'
      }}>
        <strong style={{ fontSize: 13, color: 'black' }}>
          {user}
        </strong><br />
        {message}
      </p>
    </div>
  );
}
