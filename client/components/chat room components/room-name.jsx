import React from 'react';

export default class RoomName extends React.Component {
  render() {
    return (
      <div className='location mt-3'>
        <div className='row justify-content-center'>
          <p className='col wht-txt mt-1 px-3'>Room: PLACEHOLDER</p>
          <i className="col-2 fa-solid fa-door-open wht-txt mt-2 exit" />
        </div>
      </div>
    );
  }
}
