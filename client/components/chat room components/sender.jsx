import React from 'react';

export default class Sender extends React.Component {
  render() {
    return (
      <div className='message-area'>
        <div className='mt-3'>
          <div>
            <form>
              <label htmlFor='message' className='text-box'>
                <input type='text' name='message' value='This is a placeholder for a really really long message' className='message-bar'/>
                <button type='submit' className='send'><i className="fa-solid fa-arrow-up send-arrow" /></button>
              </label>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
