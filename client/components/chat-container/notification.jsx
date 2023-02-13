import React from 'react';

export function NotifyBox(props) {
  return (
    <div className='mb-3 d-flex justify-content-center'>
      <div className='text-center' style={{ backgroundColor: 'rgb(210, 224, 231, 100%)', width: '50%' }}>
        <i style={{ color: 'rgb(2, 175, 160, 100%)' }} className="fa-solid fa-chevron-up" /> &nbsp; <strong>New Message!</strong>
      </div>
    </div>
  );
}
