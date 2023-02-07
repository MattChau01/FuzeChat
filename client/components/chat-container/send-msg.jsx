import React, { useState } from 'react';

// import toast container into component
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// TESTING IMPORT
// import { NotifyUser } from './chat-box';

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

export default function SendMessage(props) {
  const [message, setMessage] = useState('');
  function addAMessage() {
    props.addMessage({
      message
    });

    const reqObj = {
      newMessage: message,
      chatRoomName: props.currentRoom,
      userName: props.userName
    };

    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(reqObj)
    };

    fetch('/api/messages', req)
      .then(res =>
        res.json()
      )
      .then(data => {
        setMessage('');
      });
    setMessage('');
  }

  function formSubmit(event) {
    event.preventDefault();
    // setInterval(newMessage(), 2000);
    // clearInterval(newMessage);
  }

  // TESTING WITH USEEFFECT

  // let [sentStatus, setStatus] = useState(false);

  // function newMessage() {
  //   // console.log('YUH!');
  //   // console.log('sentStatus: ', sentStatus);

  //   if (sentStatus === true) {
  //     // return (
  //     //   <div className='mb-3 d-flex justify-content-center'>
  //     //     <div className='text-center' style={{ backgroundColor: 'rgb(210, 224, 231, 100%)', width: '50%' }}>
  //     //       <i style={{ color: 'rgb(2, 175, 160, 100%)' }} className="fa-solid fa-chevron-up" /> &nbsp; <strong>New Message!</strong>
  //     //     </div>
  //     //   </div>
  //     // );
  //     const msgAlert = setInterval(() => {
  //       return (
  //         <div className='mb-3 d-flex justify-content-center'>
  //           <div className='text-center' style={{ backgroundColor: 'rgb(210, 224, 231, 100%)', width: '50%' }}>
  //             <i style={{ color: 'rgb(2, 175, 160, 100%)' }} className="fa-solid fa-chevron-up" /> &nbsp; <strong>New Message!</strong>
  //           </div>
  //         </div>
  //       );
  //     }, 2000);

  //     clearInterval(msgAlert);

  //   } else {
  //     return (
  //       <div className='mt-2 pt-3'>
  //       &nbsp;
  //       </div>
  //     );
  //   }

  //   // return (
  //   //   <div className='wht-txt'>TEST!</div>
  //   // );

  // }

  // function alertUser() {
  //   // WILL CHANGE USEEFFECT INTO A FUNCTION TO TEST OUT

  //   const alertInterval = setInterval(() => {
  //     if (sentStatus === true) {
  //       return (
  //         <div className='mb-3 d-flex justify-content-center'>
  //           <div className='text-center' style={{ backgroundColor: 'rgb(210, 224, 231, 100%)', width: '50%' }}>
  //             <i style={{ color: 'rgb(2, 175, 160, 100%)' }} className="fa-solid fa-chevron-up" /> &nbsp; <strong>New Message!</strong>
  //           </div>
  //         </div>
  //       );
  //     } else {
  //       return (
  //         <div>
  //           <div className='mt-2 pt-3'>
  //             &nbsp;
  //           </div>
  //         </div>
  //       );
  //     }
  //   }, 2000);

  //   alertUser();

  //   return () => clearInterval(alertInterval);
  // }

  // const arrow = () => {
  //   return (
  //     <i style={{ color: 'rgb(2, 175, 160, 100%)' }} className="fa-solid fa-chevron-up" />
  //   );
  // };

  // function notify() {
  //   // TOAST WORKS BUT IS PLACED IN WRONG COMPONENT
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

  return (
    <>
      <div>
        {/* <div className='mb-3 d-flex justify-content-center'>
          <div className='text-center' style={{ backgroundColor: 'rgb(210, 224, 231, 100%)', width: '50%' }}>
            <i style={{ color: 'rgb(2, 175, 160, 100%)' }} className="fa-solid fa-chevron-up" /> &nbsp; <strong>New Message!</strong>
          </div>
        </div> */}
        {/* {newMessage()} */}
        {/* <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        /> */}
      </div>
      <div style={styles.textContainer}>
        <form onSubmit={formSubmit}>
          <label htmlFor='message' className='text-box'>
            <input autoComplete='off' type='text' name='message' value={message} placeholder='Message' className='message-bar'
            onChange={e => { setMessage(e.target.value); }} />
            <button type='submit' className='send' onClick={() => {
              addAMessage();
              // setStatus(sentStatus = true);
              // notify();
              // NotifyUser();
            }}><i className="fa-solid fa-arrow-up" style={styles.sendArrow} /></button>
          </label>
        </form>
      </div>
    </>
  );
}
