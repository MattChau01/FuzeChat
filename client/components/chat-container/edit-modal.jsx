import React, { useState } from 'react';

const styles = {
  modalBlock: {
    backgroundColor: '#283C46',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '70%',
    height: '35%',
    position: 'absolute',
    top: '30%',
    left: '15%',
    borderRadius: '0.8rem'
  },
  buttonSize: {
    width: '70%',
    marginLeft: '1rem'
  }
};

export function EditModal(props) {

  const [prevMessage, setPrevMessage] = useState(props.msgEdit);

  function patchReq() {
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
    fetch(`/api/messages/${reqObj.message}`, req)
      .then(res =>
        res.json()
      )
      .then(data => {
        props.updatedMsg(data.newMessage);
        setPrevMessage('');

      });
  }

  return (

    <div className='overlay'>
      <div className='modal-container'>
        <div style={styles.modalBlock} className='wht-txt text-center'>
          <div className='row'>
            <h5 className='text-center'>
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
                      setPrevMessage(e.target.value);
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
                      props.IsEdited();
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

  );
}
