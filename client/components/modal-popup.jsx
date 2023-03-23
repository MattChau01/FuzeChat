import React from 'react';

export default function Modal(props) {
  return (
    <div style={{
      backgroundColor: 'rgb(0 0 0 / 70 %)'
    }}>
      <div className='d-flex justify-content-center text-center' style={{
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: 'rgb(0,0,0,.5)'
      }} >
        <div className='mt-5'>
          <div className='mt-5 pt-5'>
            <div className='mt-5 pt-5'>
              <div style={{
                backgroundColor: '#283C46',
                width: '20rem',
                height: '10rem'
              }}>
                <div className='row'>
                  <p className='wht-txt pt-4' style={{
                    fontWeight: 600
                  }}>Are you sure you want to leave?</p>
                </div>
                <div className='row pt-3'>
                  <div className='col'>
                    <button style={{
                      backgroundColor: '#EB8E8E',
                      color: '#fff',
                      borderRadius: '2rem',
                      borderStyle: 'none'
                    }} onClick={props.cancelClick} >Cancel</button>
                  </div>
                  <div className='col'>
                    <button style={{
                      backgroundColor: '#2EDF11',
                      color: '#fff',
                      borderRadius: '2rem',
                      borderStyle: 'none'
                    }} onClick={props.confirmClick} >Confirm</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
