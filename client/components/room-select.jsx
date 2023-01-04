import React from 'react';

export default class SelectRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonClicked: false,
      selectClicked: false,
      currentVal: null,
      userId: null,
      chatRoomId: null
    };
    this.selectClicked = this.selectClicked.bind(this);
    this.buttonClicked = this.buttonClicked.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  selectClicked(event) {
    this.setState({
      selectClicked: !this.state.selectClicked,
      currentVal: event.target.value,
      buttonClicked: false
    });
    // eslint-disable-next-line
    console.log('clicked?: ', !this.state.isClicked);
    // eslint-disable-next-line
    console.log(typeof event.target.value);
  }

  buttonClicked() {
    this.setState({
      buttonClicked: true
    });
    // eslint-disable-next-line
    console.log('please select');
  }

  handleSubmit(event) {
    event.preventDefault();

    const reqObj = {};
    reqObj.roomSelection = this.state.currentVal;

    const req = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(reqObj)
    };

    // console.log('reqobj: ', reqObj);

    fetch('/api/usersInChat', req)
      .then(res => res.json())
      .then(data => {
        // console.log('data: ', data);
        this.setState({
          currentVal: event.target.value
        });

        // INSERT HASH TO CHAT ROOM HERE:
        // ROOM HASH
      });
    // console.log('this.currentValue: ', this.state.currentVal);
    // console.log('assigned to current val: ', this.state.currentVal);
  }

  render() {
    // eslint-disable-next-line
    console.log('current value: ', this.state.currentVal);
    // eslint-disable-next-line
    // console.log('type: ', typeof this.state.currentVal);

    if (this.state.buttonClicked === true && this.state.currentVal === null) {
      return (
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
                  <option value='lfz2022'>lfz2022</option>
                  <option value='zoomuni'>zoomuni</option>
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
      );
      // WORKING ON DISPLAYING SUCCESS MESSAGE ONLY AFTER BOTH SELECT IS CLICKED AND A SELECITON IS MADE
    } else if (this.state.currentVal !== null && this.selectClicked) {
      return (
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
                  <option value='lfz2022' >lfz2022</option>
                  <option value='zoomuni' >zoomuni</option>
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
      );
    } else {
      return (
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
                  <option value='lfz2022' >lfz2022</option>
                  <option value='zoomuni' >zoomuni</option>
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
      );
    }
  }
}
