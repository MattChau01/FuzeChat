import React, { useState } from 'react';
// TESTING IMPORT
// import ChatBoxSender from './chat-box';

const styles = {
  // modalContainer: {
  //   position: 'fixed',
  //   left: 0,
  //   right: 0,
  //   top: 0,
  //   bottom: 0,
  //   height: '100vh'

  //   // backgroundColor: 'rgb(14, 27, 35, 100%)'
  // },
  modalBlock: {
    backgroundColor: '#283C46',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    // alignItems: 'center',
    width: '70%',
    height: '35%',
    position: 'absolute',
    top: '30%',
    left: '15%',
    // right: 0
    borderRadius: '0.8rem'
  },
  buttonSize: {
    width: '70%',
    marginLeft: '1rem'
    // color: '#fff'
  }
  // cancel: {
  //   backgroundColor: '#EB8E8E',
  //   borderStyle: 'none',
  //   borderRadius: '5rem',
  //   outline: 'none',
  //   marginLeft: '.5rem'
  // },
  // confirm: {
  //   backgroundColor: '#87EF76',
  //   borderStyle: 'none',
  //   borderRadius: '5rem',
  //   outline: 'none',
  //   marginLeft: '.5rem'
  // }
  // overlay: {
  //   backgroundColor: 'rgb(0, 0, 0, 70 %)'
  // }
};

export function EditModal(props) {

  // console.log('chat in edit: ', props.chat);

  // console.log('chat as props: ', props.chat);
  // console.log('msgEdit as props: ', props.msgEdit);

  // ***** Working on styling modal and overlay (GOOD) *****

  // need to add `setMessage` as second parameter
  const [prevMessage, setPrevMessage] = useState(props.msgEdit);
  // const [newMessage, setNewMessage] = useState('');

  // TEST NEW MESSAGE STATE
  const [updatedMsg, setUpdatedMsg] = useState(prevMessage);

  function patchReq() {
    // WORKING ON THIS
    const reqObj = {
      message: props.msgEdit,
      newMessage: prevMessage
    };
    const req = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(reqObj)
    };
    // console.log('req: ', req);

    // console.log('PATCH HERE');

    // PATCH REQUEST HERE:
    fetch(`/api/messages/${reqObj.message}`, req)
      .then(res =>
        res.json()
      )
      .then(data => {
        // console.log('data value: ', data);
        // console.log('data.message: ', data.newMessage);

        // TRYING TO REASSIGN MESSAGE
        setUpdatedMsg(data.newMessage);
        setPrevMessage('');

        // eslint-disable-next-line
        console.log('updated msg line 97: ', updatedMsg);

      });

    // <ChatBoxSender messageX={updatedMsg}/>;
    // <ChatBoxSender updatedMsg={updatedMsg}/>;
  }

  // console.log('updated msg 105: ', updatedMsg);

  return (

    <div className='overlay'>
      <div className='modal-container'>
        <div style={styles.modalBlock} className='wht-txt text-center'>
          <div className='row'>
            <h5 className='text-center'>
              {/* <strong>Edit your message below:</strong> */}
              Edit your message below:
            </h5>
          </div>
          <div className='row'>
            <div className='row'>
              <form autoComplete='off'>
                <div className='row'>
                  <label htmlFor='edit'>
                    <input name='edit' type='text' placeholder={props.msgEdit} value={prevMessage} className='edit-message' rows='2'
                    onChange={e => {
                      // console.log('modal input value: ', e.target.value);
                      setPrevMessage(e.target.value);
                      // console.log('message value in edit-modal: ', message);
                    }} />
                  </label>
                </div>
                <div className='row'>
                  <div className='col mt-4'>
                    <button style={styles.buttonSize} className='cancel' onClick={e => {
                      e.preventDefault();
                      props.HideModal();
                    }} >Cancel</button>
                  </div>
                  <div className='col mt-4'>
                    <button style={styles.buttonSize} className='confirm' onClick={e => {
                      e.preventDefault();
                      patchReq();
                      props.HideModal();
                    }} >Confirm</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>

  // TRIAL TWO
  // <>
  //   <div className='overlay' />
  //   <div>
  //     <div>
  //       <div>
  //         <p className='wht-txt' >TEST</p>
  //       </div>
  //     </div>
  //   </div>
  // </>
  // TRIAL ONE

  // <div style={styles.modalContainer} >
  //   <div style={styles.modalBlock}>
  //     <p className='wht-txt overlay'>
  //       TEST AGAIN
  //     </p>
  //   </div>
  // </div>

  );
}
