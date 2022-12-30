import React from 'react';

export default class NewUserName extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isClicked: false,
      userName: ''
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleUserName = this.handleUserName.bind(this);
    this.handleSubmitUserName = this.handleSubmitUserName.bind(this);
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
    // eslint-disable-next-line
    // console.log('username: ', this.state.userName);
  }

  handleSubmitUserName(event) {
    if (this.state.userName.length < 7) {
      // eslint-disable-next-line
      console.log('invalid input!');
      event.preventDefault();

      return false;
    } else {

      // WILL NEED TO REMOVE WHEN STARTING VIEW SWAP
      event.preventDefault();

      // eslint-disable-next-line
      console.log('submitted!');
      // this.setState({
      //   userName: ''
      // });
      // eslint-disable-next-line
      console.log('final username: ', this.state.userName);

      // POST METHOD HERE:

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
        });
    }
  }

  render() {
    // console.log('username being typed: ', this.state.userName);

    if ((this.state.userName.length < 7) && (this.state.userName.length >= 1)) {
      return (
        <>
          <div className='instruct wht-txt'>
            <p className='wrong'>Username is invalid, please try again!</p>
          </div>
          <form onSubmit={this.handleSubmitUserName}>
            <div className='mt-5'>
              <label htmlFor='username'>
                <input name='username' type='text' placeholder='Type a username here' className='user-input' value={this.state.userName} onChange={this.handleUserName} onClick={this.handleClick} />
              </label>
            </div>
            <div className='mt-5'>
              <button type='submit' className='next grn'>NEXT</button>
            </div>
          </form>
        </>
      );
    } else if (this.state.userName.length >= 7) {
      return (
        <>
          <div className='instruct wht-txt'>
            <p className='correct'>Success! Please click next.</p>
          </div>
          <form onSubmit={this.handleSubmitUserName}>
            <div className='mt-5'>
              <label htmlFor='username'>
                <input name='username' type='text' placeholder='Type a username here' className='user-input' value={this.state.userName} onChange={this.handleUserName} onClick={this.handleClick} />
              </label>
            </div>
            <div className='mt-5'>
              <button type='submit' className='next grn'>NEXT</button>
            </div>
          </form>
        </>
      );
    } else {
      return (
        <>
          <div className='instruct wht-txt'>
            <p>Please enter a username below</p>
          </div>
          <form onSubmit={this.handleSubmitUserName}>
            <div className='mt-5'>
              <label htmlFor='username'>
                <input name='username' type='text' placeholder='Type a username here' className='user-input' value={this.state.userName} onChange={this.handleUserName} onClick={this.handleClick} />
              </label>
            </div>
            <div className='mt-5'>
              <div className='mt-5'>
                <button type='submit' className='next grn'>NEXT</button>
              </div>
            </div>
          </form>
        </>
      );
    }
  }
}
