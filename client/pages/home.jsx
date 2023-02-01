import React from 'react';
import ParseRoute from '../lib/parse-route';
import NewUserName from '../components/username';
import SelectRoom from '../components/room-select';
import ChatRoom from '../components/chat-room';
// REFACTOR TEST
// import SendMessage from '../components/chat-container/send-msg';

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
      return (
        <SelectRoom />
      );
    }
    if (path === 'user-name') {
      return (
        <NewUserName />
      );
    }
    if (path === 'message') {
      return (
        <>
          <ChatRoom />
          {/* <SendMessage /> */}
        </>
      );
    }
  }

  render() {
    return (
      <div>
        { this.renderPage() }
      </div>
    );
  }

}
