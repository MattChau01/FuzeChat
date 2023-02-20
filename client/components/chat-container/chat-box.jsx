import React, { useEffect, useState } from 'react';
import newMessage from '../../../server/public/newMessage.mp3';

const alert = new Audio(newMessage);

export function ChatBoxReceiver(props, { user, message }) {

  useEffect(() => {
    alert.play();
  }, []);

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

  // const [edit, setEdit] = useState(false);
  const [msg, setMsg] = useState('');

  function RetrieveMsg() {

    // return (
    //   <div>TEST</div>
    // );

    fetch('/api/messages')
      .then(res => res.json())
      .then(data => {
        // console.log('data: ', data[0]);
        // console.log('data.message: ', data[0].newMessage);
        setMsg(data[0].newMessage);

        // console.log('message value line 58:', msg);
      })
      .catch(err => console.error(err));

    return (
      <div>
        {msg}
      </div>
    );
  }
  // console.log('new message value: ', props.newMessage);

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'flex-end',
      flexDirection: 'row'
    }} className='mx-2 my-2' >
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
        {/* TESTING HOVER ON MESSAGE */}
        <div className='row'>
          <div className='col'>
            {/* TESTING STATUS OF `editStatus` */}
            {/* {console.log('editStatus: ', props.editStatus)}
            {console.log('message: ', props.message)} */}

            {/* ***** props.message WORKS ***** WILL WORK ON GET REQUEST TO PRINT LATEST MESSAGE */}
            {/* {props.message} */}

            {/* TESTING GET REQUEST HERE */}

            <RetrieveMsg />
            {/* {msg} */}

          </div>
          <div className='col-1 px-3 text-right'>
            <i style={{ fontSize: '.4rem' }} className="fa-solid fa-circle edit" onClick={props.editClick} />
          </div>

          {/* ANOTHER TEST */}
          {/* <div onMouseEnter={() => {
            console.log('test1');
            return (
              <div className='col-2 text-end'>
                <i style={{ fontSize: '.5rem' }} className="fa-solid fa-pencil" />
              </div>
            );
          }} /> */}

        </div>
      </div>
    </div>
  );
}
