import React from 'react';

export default class Sender extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      value: event.target.value
    });
  }

  render() {
    return (
      <div className='message-area text-center'>
        <div className='mt-3'>
          <div>
            <form>
              <label htmlFor='message' className='text-box'>
                <input type='text' name='message' value={this.state.value} placeholder='Message' className='message-bar' onChange={this.handleChange}/>
                <button type='submit' className='send'><i className="fa-solid fa-arrow-up send-arrow" /></button>
              </label>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
