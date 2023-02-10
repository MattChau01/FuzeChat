import React from 'react';
// import React, { useEffect } from 'react';
// import React, { useEffect, useState } from 'react';

// commenting out useeffect and usestate

// import toast container into component
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function NotifyUser(props) {
  // console.log('toast!');
  // console.log('props: ', props);
  // const id = Date.now();

  toast.success('Connected with a user!', {
    position: 'top-right',
    autoClose: 500,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    // test with prevent default
    preventDefault: false,
    // test with prevent close
    preventCloseOnClick: true,
    progress: undefined,
    theme: 'light'
  });

}

// export function notify() {
//   toast.info('New message!', {
//     position: 'top-right',
//     autoClose: 1000,
//     hideProgressBar: false,
//     closeOnClick: true,
//     pauseOnHover: true,
//     draggable: true,
//     progress: undefined,
//     theme: 'light'
//   });
// }

export function ChatBoxReceiver(props, { user, message }) {

  // useEffect(() => {
  //   if (window.onfocus) {
  //     console.log('focused!');
  //   } else {
  //     console.log('UNfocused!');
  //   }
  // });

  // function notifyUser() {
  //   console.log('toast!');
  //   toast('New Mmessage!', {
  //     position: 'top-right',
  //     autoClose: 2000,
  //     hideProgressBar: false,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //     draggable: true,
  //     progress: undefined,
  //     theme: 'light'
  //   });
  // }
  // console.log(props);
  NotifyUser();
  // const

  // console.log('new msg!');

  // console.log('props: ', props);
  // props.notifyUser();

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
      <ToastContainer
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
      />
    </>
  );
}

export function ChatBoxSender(props, { user, message }) {

  // useEffect(() => {
  //   if (window.onfocus) {
  //     console.log('focused!');
  //   } else {
  //     console.log('UNfocused!');
  //   }
  // });

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
