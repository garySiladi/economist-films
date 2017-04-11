// @flow
import React from 'react';
import SidePanel from '../side-panel/side-panel';
import HomeContainer from '../home-container/home-container';
import './app.css';

// App needs to be a class in order to allow hot-reloading
// that's why we disable react/prefer-stateless-function
class App extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className="app">
        <SidePanel user={{ id: 1, name: 'Profile Name', imgUrl: 'x' }} />
        <HomeContainer />
      </div>
    );
  }
}

export default App;
