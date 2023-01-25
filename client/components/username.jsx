import React from 'react';
import Redirect from './redirect';
import enterChat from '../../server/public/enterChat.mp3';

export default class NewUserName extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isClicked: false,
      userName: '',
      currentVal: window.location.hash.slice(11)
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleUserName = this.handleUserName.bind(this);
    this.handleSubmitUserName = this.handleSubmitUserName.bind(this);
    this.playChime = this.playChime.bind(this);
  }

  playChime() {
    new Audio(enterChat).play();
  }

  handleClick() {
    this.setState({
      isClicked: !this.state.isClicked
    });
  }

  handleUserName(event) {
    this.setState({
      userName: event.target.value
    });
  }

  handleSubmitUserName(event) {
    if (this.state.userName.length < 7) {
      event.preventDefault();

      return false;
    } else {

      // TEST with local storage
      // localStorage.setItem('username: ', this.state.userName);

      // adding chime when user enters
      const audio = new Audio(enterChat);
      audio.play();

      event.preventDefault();

      const reqObj = {};
      reqObj.userName = this.state.userName;

      const req = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(reqObj)
      };

      fetch('/api/users', req)
        .then(res => res.json())
        .then(data => {
          this.setState({
            userName: ''
          });
          // Refactoring order
          // window.location.hash = `choose-room?${this.state.userName}`;
          //     window.location.hash = `message?choose-room?${this.state.userName}=${this.state.currentVal}`;

          window.location.hash = `message&${this.state.currentVal}&${this.state.userName}`;
        });

      if (this.state.userName.length >= 7) return <Redirect to="choose-room" />;
    }
  }

  render() {

    if ((this.state.userName.length < 7) && (this.state.userName.length >= 1)) {
      return (
        <div className='container-fluid mt-5 pt-5' >
          <div className='mt-5 pt-5 d-flex align-items-center justify-content-center text-center'>
            <div>
              <p className='welcome wht-txt'>Welcome to FuzeChat!</p>
              <div className='instruct wht-txt'>
                <p className='wrong'>Username is invalid, please try again!</p>
              </div>
              <form autoComplete='off' onSubmit={this.handleSubmitUserName}>
                <div className='mt-5'>
                  <label htmlFor='username'>
                    <input name='username' type='text' placeholder='Type a username here' className='user-input' value={this.state.userName} onChange={this.handleUserName} onClick={this.handleClick} />
                  </label>
                </div>
                <div className='mt-5'>
                  <button type='submit' className='next grn' href='#choose-room'>NEXT</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      );
    } else if (this.state.userName.length >= 7) {
      return (
        <div className='container-fluid mt-5 pt-5' >
          <div className='mt-5 pt-5 d-flex align-items-center justify-content-center text-center'>
            <div>
              <p className='welcome wht-txt'>Welcome to FuzeChat!</p>
              <div className='instruct wht-txt'>
                <p className='correct'>Success! Please click next.</p>
              </div>
              <form autoComplete='off' onSubmit={this.handleSubmitUserName}>
                <div className='mt-5'>
                  <label htmlFor='username'>
                    <input name='username' type='text' placeholder='Type a username here' className='user-input' value={this.state.userName} onChange={this.handleUserName} onClick={this.handleClick} />
                  </label>
                </div>
                <div className='mt-5'>
                  <button type='submit' className='next grn' href='#choose-room'>NEXT</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className='container-fluid mt-5 pt-5' >
          <div className='mt-5 pt-5 d-flex align-items-center justify-content-center text-center'>
            <div>
              <p className='welcome wht-txt'>Welcome to FuzeChat!</p>
              <div className='instruct wht-txt'>
                <p>Please enter a username below</p>
              </div>
              <form autoComplete='off' onSubmit={this.handleSubmitUserName}>
                <div className='mt-5'>
                  <label htmlFor='username'>
                    <input name='username' type='text' placeholder='Type a username here' className='user-input' value={this.state.userName} onChange={this.handleUserName} onClick={this.handleClick} />
                  </label>
                </div>
                <div className='mt-5'>
                  <div className='mt-5'>
                    <button type='submit' className='next grn' href='#choose-room'>NEXT</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      );
    }
  }
}

// TEST CONVERSION TO REGULAR FUNCTION

// import React, { useState } from 'react';
// import Redirect from './redirect';
// import enterChat from '../../server/public/enterChat.mp3';

// export default function NewUserName({ setUser }) {

//   const [user, setAUser] = useState('');

//   // function playChime() {
//   //   new Audio(enterChat).play();
//   // }

//   let isClicked = false;

//   function handleClick() {
//     isClicked = !isClicked;
//   }

//   // let userName = '';

//   // function handleUserName(event) {
//   //   setAUser(event.target.value);
//   // }

//   const currentVal = window.location.hash.slice(11);

//   function handleSubmitUserName(event) {
//     if (user.length < 7) {
//       event.preventDefault();

//       return false;
//     } else {
//       // setUser(user);
//       // TEST with local storage
//       localStorage.setItem('username: ', user);

//       // adding chime when user enters
//       const audio = new Audio(enterChat);
//       audio.play();

//       event.preventDefault();

//       const reqObj = {};
//       reqObj.userName = user;

//       const req = {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(reqObj)
//       };

//       fetch('/api/users', req)
//         .then(res => res.json())
//         .then(data => {
//           // userName = [];
//           window.location.hash = `message&${currentVal}&${user}`;
//         });

//       if (user.length >= 7) return <Redirect to="choose-room" />;
//     }
//   }

//   if ((user.length < 7) && (user.length >= 1)) {
//     return (
//       <div className='container-fluid mt-5 pt-5' >
//         <div className='mt-5 pt-5 d-flex align-items-center justify-content-center text-center'>
//           <div>
//             <p className='welcome wht-txt'>Welcome to FuzeChat!</p>
//             <div className='instruct wht-txt'>
//               <p className='wrong'>Username is invalid, please try again!</p>
//             </div>
//             <form autoComplete='off' onSubmit={handleSubmitUserName}>
//               <div className='mt-5'>
//                 <label htmlFor='username'>
//                   <input name='username' type='text' placeholder='Type a username here' className='user-input' value={user} onChange={e => setAUser(e.target.value)} onClick={handleClick} />
//                 </label>
//               </div>
//               <div className='mt-5'>
//                 <button type='submit' className='next grn' href='#choose-room'>NEXT</button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     );
//   } else if (user.length >= 7) {
//     return (
//       <div className='container-fluid mt-5 pt-5' >
//         <div className='mt-5 pt-5 d-flex align-items-center justify-content-center text-center'>
//           <div>
//             <p className='welcome wht-txt'>Welcome to FuzeChat!</p>
//             <div className='instruct wht-txt'>
//               <p className='correct'>Success! Please click next.</p>
//             </div>
//             <form autoComplete='off' onSubmit={handleSubmitUserName}>
//               <div className='mt-5'>
//                 <label htmlFor='username'>
//                   <input name='username' type='text' placeholder='Type a username here' className='user-input' value={user} onChange={e => setAUser(e.target.value)} onClick={handleClick} />
//                 </label>
//               </div>
//               <div className='mt-5'>
//                 <button type='submit' className='next grn' href='#choose-room'>NEXT</button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     );
//   } else {
//     return (
//       <div className='container-fluid mt-5 pt-5' >
//         <div className='mt-5 pt-5 d-flex align-items-center justify-content-center text-center'>
//           <div>
//             <p className='welcome wht-txt'>Welcome to FuzeChat!</p>
//             <div className='instruct wht-txt'>
//               <p>Please enter a username below</p>
//             </div>
//             <form autoComplete='off' onSubmit={handleSubmitUserName}>
//               <div className='mt-5'>
//                 <label htmlFor='username'>
//                   <input name='username' type='text' placeholder='Type a username here' className='user-input' value={user} onChange={e => setAUser(e.target.value)} onClick={handleClick} />
//                 </label>
//               </div>
//               <div className='mt-5'>
//                 <div className='mt-5'>
//                   <button type='submit' className='next grn' href='#choose-room'>NEXT</button>
//                 </div>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     );
//   }
//   // }
// }
