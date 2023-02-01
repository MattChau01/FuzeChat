// import React, { useState } from 'react';
import React from 'react';

// let messagedAt = null;

// function messageTimeStamp() {
//   fetch('/api/messages')
//     .then(res => res.json())
//     .then(msgTime => { messagedAt = msgTime; });
//   console.log('messagedAt: ', messagedAt);
//   return messagedAt;
// }

export default function ChatBoxReceiver(props, { user, message }) {

  // const date = new Date();

  // const hour = date.getHours();
  // const minutes = date.getMinutes();

  // console.log('receiver');

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'flex-start',
      flexDirection: 'row',
      margin: 5
    }}>
      <div style={{
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
            {props.tStamp}
            {/* BELOW WORKS */}
            {/* {props.timeStamp} */}

          </div>
        </div>
        {props.message}
      </div>
    </div>
  );
}

export function ChatBoxSender(props, { user, message }) {

  // const date = new Date();
  // const hour = date.getHours();
  // const minutes = date.getMinutes();

  // let timeStamp = null;

  // WORKING HERE:

  // moved fetch request to parent component

  // const [time, setTime] = useState([]);

  // const getTime = () => {
  //   fetch('/api/messages')
  //     .then(res => res.json())
  //     .then(data => {
  //       setTime(data[0].timestamp);
  //       // console.log('data: ', data);
  //       // console.log('updated time: ', time);
  //     })
  //     .catch(err => console.error(err));
  // };

  // console.log(time);

  // WORKING ABOVE:

  // getTime();

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'flex-end',
      flexDirection: 'row',
      margin: 5
    }}>
      <div style={{
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
            {props.tStamp}
            {/* BELOW WORKS */}
            {/* {props.timeStamp} */}

          </div>
        </div>
        {props.message}
      </div>
    </div>
  );
}
