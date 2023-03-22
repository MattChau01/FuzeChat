import React, { useState } from 'react';
import NewUser from '../../lib/print-username';
import FindRoom from '../../lib/select-room';

// export default class RoomName extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       currentRoom: FindRoom(window.location.hash),
//       userName: NewUser(window.location.hash)
//     };
//   }

//   render() {
//     return (
//       <div className='location mt-3'>
//         <div className='row justify-content-center'>
//           <p className='col wht-txt mt-1 px-4'><strong>User:</strong> {this.state.userName} &nbsp; <strong>Room:</strong> {this.props.currentRoom}</p>
//           <i className='col-1 fa-solid fa-door-open wht-txt mt-2'
//           style={{
//             textAlign: 'end',
//             marginRight: '1.5rem',
//             cursor: 'pointer'
//           }}/>
//         </div>
//       </div>
//     );
//   }
// }

export default function RoomName(props) {

  const [userName] = useState(NewUser(window.location.hash));
  const [currentRoom] = useState(FindRoom(window.location.hash));

  return (
    <div className='location mt-3'>
      <div className='row justify-content-center'>
        <p className='col wht-txt mt-1 px-4'><strong>User:</strong> {userName} &nbsp; <strong>Room:</strong> {currentRoom}</p>
        <i className='col-1 fa-solid fa-door-open wht-txt mt-2'
          style={{
            textAlign: 'end',
            marginRight: '1.5rem',
            cursor: 'pointer'
          }}
          // onClick={
          //   // console.log('clicked')
          // }
          />
      </div>
    </div>

  );
}
