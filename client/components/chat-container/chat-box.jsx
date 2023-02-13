import React from 'react';
// import React, { useEffect } from 'react';
// import React, { useEffect, useState } from 'react';

// commenting out useeffect and usestate

// import toast container into component
// import { ToastContainer, toast } from 'react-toastify';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// export function NotifyUser(props) {

//   // const id = Date.now();

//   toast.success('Connected with a user!', {
//     position: 'top-right',
//     autoClose: 1000,
//     hideProgressBar: true,
//     closeOnClick: true,
//     pauseOnHover: false,
//     draggable: true,
//     // test with prevent default
//     preventDefault: false,
//     // test with prevent close
//     preventCloseOnClick: true,
//     progress: undefined,
//     theme: 'light'
//   });

// }

export function ChatBoxReceiver(props, { user, message }) {

  // NotifyUser();

  // clearInterval(props.interval);

  return (
    <>
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
      {/* <ToastContainer /> */}
      {/* <ToastContainer
        position="top-right"
        autoClose={500}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        preventDefault={false}
        theme="light"
      /> */}
    </>
  );
}

export function ChatBoxSender(props, { user, message }) {

  // clearInterval(props.interval);

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
