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
    // eslint-disable-next-line
    console.log('clicked?: ', this.state.isClicked);
  }

  handleUserName(event) {
    this.setState({
      userName: event.target.value
    });
    // eslint-disable-next-line
    console.log('username: ', this.state.userName);
  }

  handleSubmitUserName(event) {
    event.preventDefault();
    this.setState({
      userName: ''
    });
    // eslint-disable-next-line
    console.log('submitted!');
  }

  render() {
    return (
      <form onSubmit={this.handleSubmitUserName}>
        <div className='mt-5'>
          <label htmlFor='username'>
            <input required name='username' type='text' placeholder='Type a username here' className='user-input'value={this.state.userName} onChange={this.handleUserName}/>
          </label>
        </div>
        <div className='mt-5'>
          <button type='submit' className='next' onClick={this.handleClick}>NEXT</button>
        </div>
      </form>
    );

  }
}
