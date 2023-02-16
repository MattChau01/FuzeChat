import React, { useState } from 'react';

const styles = {
  // modalContainer: {
  //   position: 'fixed',
  //   left: 0,
  //   right: 0,
  //   top: 0,
  //   bottom: 0

  //   // backgroundColor: 'rgb(14, 27, 35, 100%)'
  // },
  modalBlock: {
    backgroundColor: 'rgb(14, 27, 35, 100%)',
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
  overlay: {
    backgroundColor: 'rgb(0, 0, 0, 70 %)'
  }
};

export function EditModal(props) {

  // ***** Working on styling modal and overlay *****

  // need to add `setMessage` as second parameter
  const [message] = useState('');

  return (
    <>
      <div style={styles.overlay} />
      <div className='overlay'>
        <div className='modalContainer'>
          <div style={styles.modalBlock} className='wht-txt text-center'>
            <div className='row'>
              <p>
                <strong>Edit your message below:</strong>
              </p>
            </div>
            <div className='row'>
              <div className='row'>
                <form>
                  <diV className='row'>
                    <label htmlFor='edit'>
                      <input name='edit' type='text' placeholder='Message' value={message} className='edit-message' rows='2'/>
                    </label>
                  </diV>
                  <div className='row text-center'>
                    <div className='col mt-4'>
                      <button>Cancel</button>
                    </div>
                    <div className='col mt-4'>
                      <button>Confirm</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
