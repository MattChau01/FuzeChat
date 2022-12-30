import React from 'react';
import Header from './components/nav-bar';
import Home from './pages/home';

export default class App extends React.Component {
  render() {
    return (
      <>
        <Header />
        <Home />
      </>
    );
  }
}
