import React from 'react';
// import enterChat from '../../server/public/enterChat.mp3';

export default class SelectRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonClicked: false,
      selectClicked: false,
      currentVal: null
      // REVIEW HOW TO DO HASH ROUTE, NEED TO REMOVE THE UNDEFINED VALUE IN URL
      // userName: window.location.hash.slice(13)
    };
    this.selectClicked = this.selectClicked.bind(this);
    this.buttonClicked = this.buttonClicked.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.playChime = this.playChime.bind(this);
  }

  selectClicked(event) {
    this.setState({
      selectClicked: !this.state.selectClicked,
      currentVal: event.target.value,
      buttonClicked: false
    });
  }

  // playChime() {
  //   new Audio(enterChat).play();
  // }

  buttonClicked() {
    this.setState({
      buttonClicked: true
    });
  }

  handleSubmit(event) {
    if (this.currentVal === null) {
      event.preventDefault();
      return false;
    } else {
      event.preventDefault();

      this.setState({
        currentVal: event.target.value
      });

      // const audio = new Audio(enterChat);
      // audio.play();

      // const reqObj = {};
      // reqObj.chatRoomName = this.state.currentVal;
      // reqObj.userName = this.state.userName;

      // const req = {
      //   method: 'POST',
      //   headers: {
      //     'Content-type': 'application/json'
      //   },
      //   body: JSON.stringify(reqObj)
      // };

      // fetch('/api/usersInChat', req)
      //   .then(res => res.json())
      //   .then(data => {
      //     this.setState({
      //       currentVal: event.target.value
      //     });
      //     // Refactoring order
      //     window.location.hash = `message?choose-room?${this.state.userName}=${this.state.currentVal}`;
      //     window.location.hash = `user-name?${this.state.currentVal}`;
      //   });
      window.location.hash = `user-name?${this.state.currentVal}`;

    }
  }

  render() {
    if (this.state.buttonClicked === true && this.state.currentVal === null) {
      return (
        <div className='container-fluid mt-5 pt-5' >
          <div className='mt-5 d-flex align-items-center justify-content-center text-center'>
            <div>
              <p className='welcome wht-txt'>Welcome to FuzeChat!</p>
              <div className='pt-1'>
                <div className='select mt-5'>
                  <form onSubmit={this.handleSubmit}>
                    <div className='pt-4'>
                      <label htmlFor='rooms' className='instruct pt-3 wrong'>Please select a chat room to join!</label>
                    </div>
                    <div className='pt-5'>
                      <select required className='selection' name='rooms' onClick={this.selectClicked}>
                        <option value=''>Select a room here..</option>
                        <option value='rc1022' >rc1022</option>

                      </select>
                    </div>
                    <div className='mt-5 pt-4'>
                      <div className='mt-5'>
                        <button type='submit' className='next grn' onClick={this.buttonClicked}>NEXT</button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (this.state.currentVal !== null && this.selectClicked) {
      return (
        <div className='container-fluid mt-5 pt-5' >
          <div className='mt-5 d-flex align-items-center justify-content-center text-center'>
            <div>
              <p className='welcome wht-txt'>Welcome to FuzeChat!</p>
              <div className='pt-1'>
                <div className='select mt-5'>
                  <form onSubmit={this.handleSubmit}>
                    <div className='pt-4'>
                      <label htmlFor='rooms' className='instruct pt-3 correct'>Please click next after selecting!</label>
                    </div>
                    <div className='pt-5'>
                      <select required className='selection' name='rooms' onClick={this.selectClicked}>
                        <option value=''>Select a room here..</option>
                        <option value='rc1022' >rc1022</option>

                      </select>
                    </div>
                    <div className='mt-5 pt-4'>
                      <div className='mt-5'>
                        <button type='submit' className='next grn' onClick={this.buttonClicked}>NEXT</button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className='container-fluid mt-5 pt-5'>
          <div className='mt-5 d-flex align-items-center justify-content-center text-center'>
            <div>
              <p className='welcome wht-txt'>Welcome to FuzeChat!</p>
              <div className='pt-1'>
                <div className='select mt-5'>
                  <form onSubmit={this.handleSubmit}>
                    <div className='pt-4'>
                      <label htmlFor='rooms' className='instruct pt-3 wht-txt'>Please select a chat room to join</label>
                    </div>
                    <div className='pt-5'>
                      <select required className='selection' name='rooms' onClick={this.selectClicked}>
                        <option value=''>Select a room here..</option>
                        <option value='rc1022' >rc1022</option>

                      </select>
                    </div>
                    <div className='mt-5 pt-4'>
                      <div className='mt-5'>
                        <button type='submit' className='next grn' onClick={this.buttonClicked}>NEXT</button>
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
  }
}
