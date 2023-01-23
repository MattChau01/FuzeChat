import React from 'react';

export default function Messages(props) {
  const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div>
      <div style={{
        backgroundColor: 'rgb(115, 134, 143, 100)',
        padding: '.5rem',
        borderRadius: '.8rem'
      }} >
        <div className='row'>
          <div className='col'>{props.username}:</div>
          <div className='col text-end mr-5'>{time}</div>
        </div>

        <p>{props.newMsg}</p>
      </div>
    </div>
  );
}
