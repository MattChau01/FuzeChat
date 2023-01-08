import React from 'react';
import io from '../../lib/io';

export default class Sender extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
    this.socket = io().connect();
  }

  componentDidMount() {
    this.socket.emit('message', {
      type: 'user-join',
      text: `User ${this.props.userName} has joined`
    });

    this.socket.on('message', newMessage => {
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
