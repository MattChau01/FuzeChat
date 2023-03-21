import React from 'react';

export default function Modal(props) {
  return (
    // <div className='wht-txt'>TEST</div>
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
            <div style={{
              backgroundColor: '#283C46',
              width: '20rem',
              height: '10rem'
            }} className='mt-5'>
              <div>
                <p className='wht-txt'>Are you sure you want to leave the room?</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
