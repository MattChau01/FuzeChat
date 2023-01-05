import React from 'react';
import ParseRoute from '../lib/parse-route';
// import NewUserName from '../components/username';
import SelectRoom from '../components/room-select';
import ChatRoom from '../components/chat-room';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: ParseRoute(window.location.hash)
    };
    this.renderPage = this.renderPage.bind(this);
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({
        route: ParseRoute(window.location.hash)
      });
    });
  }

  renderPage() {
    const { path } = this.state.route;
    if (path === '') {
      // return (
      //   <NewUserName />
      // );
      // COMMENTING OUT <NEWUSERNAME /> FOR NOW TO TEST CHAT ROOM
      return (<ChatRoom />);
    }
    if (path === 'choose-room') {
      return (
        <SelectRoom />
      );
    }
  }

  render() {
    return (

      <div className='mt-5 pt-5'>
        { this.renderPage() }
      </div>

    // <div className='container-fluid' >
    //   <div className='mt-5 pt-5'>
    //     <div className='mt-5'>
    //       <div className='mt-5 pt-5 d-flex align-items-center justify-content-center text-center'>
    //         <div>
    //           {this.renderPage()}
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    );
  }

}
