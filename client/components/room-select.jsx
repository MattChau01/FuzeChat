import React from 'react';

export default class SelectRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isClicked: false,
      currentVal: null
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    this.setState({
      isClicked: this.state.isClicked
    });
    // eslint-disable-next-line
    console.log('clicked?: ', !this.state.isClicked);
    // eslint-disable-next-line
    console.log(event.target.value);
    // eslint-disable-next-line
    console.log(typeof event.target.value);
  }

  render() {
    return (
      <div className='pt-1'>
        <div className='select mt-5'>
          <form>
            <div className='pt-4'>
              <label htmlFor='rooms' className='instruct pt-3 wht-txt'>Please select a chat room to join</label>
            </div>
            <div className='pt-5'>
              <select className='selection' name='rooms' onClick={this.handleClick}>
                <option value=''>Select a room here..</option>
                <option value='rc1022'>rc1022</option>
                <option value='lfz2022'>lfz2022</option>
                <option value='zoomuni'>zoomuni</option>
              </select>
            </div>
            <div className='mt-5 pt-4'>
              <div className='mt-5'>
                <button type='submit' className='next grn'>NEXT</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
