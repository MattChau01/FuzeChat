import React from 'react';
// import FindRoom from '../../lib/select-room';

export default class RoomName extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     currentRoom: FindRoom(window.location.hash)
  //   };
  // }

  render() {
    return (
      <div className='location mt-3'>
        <div className='row justify-content-center'>
          <p className='col wht-txt mt-1 px-3'>Current room: {this.props.currentRoom}</p>
          <i className="col-2 fa-solid fa-door-open wht-txt mt-2 exit" />
        </div>
      </div>
    );
  }
}
