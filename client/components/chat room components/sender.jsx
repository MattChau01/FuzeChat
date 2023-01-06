import React from 'react';
import io from '../../lib/io';

export default class Sender extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
      // messages: []
    };
    this.socket = io().connect();
    // this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  // handleChange(event) {
  //   this.setState({
  //     messages: event.target.value
  //   });
  // }

  // handleSubmit(event) {
  //   event.preventDefault();
  //   console.log('message to send: ', this.state.messages);

  // }

  componentDidMount() {
    this.socket.emit('message', {
      type: 'user-join',
      text: `User ${this.props.userName} has joined`
    });

    this.socket.on('message', newMessage => {
      // console.log('newMessage: ', newMessage);
      this.setState({
        messages: [
          ...this.state.messages,
          newMessage
        ]
      });
    });
  }

  componentWillUnmount() {
    this.socket.close();
  }

  render() {
    // console.log('message: ', this.state.messages);
    // console.log('location: ', window.location.hash);
    return (
      <div className='message-area text-center'>
        <div className='mt-3'>
          <div>
            <form onSubmit={this.props.handleSubmit}>
              <label htmlFor='message' className='text-box'>
                <input type='text' name='message' value={this.state.messages} placeholder='Message' className='message-bar' onChange={this.props.handleChange}/>
                <button type='submit' className='send'><i className="fa-solid fa-arrow-up send-arrow" /></button>
              </label>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
