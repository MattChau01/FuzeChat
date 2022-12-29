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
  }

  handleSubmitUserName(event) {
    event.preventDefault();
    this.setState({
      userName: ''
    });
  }

  render() {
    return (
      <form>
        <div className='mt-5'>
          <label htmlFor='username'>
            <input name='username' type='text' value='Type a username here' className='user-input' />
          </label>
        </div>
        <div className='mt-5'>
          <button type='submit' className='next'>NEXT</button>
        </div>
      </form>
    );

  }
}
