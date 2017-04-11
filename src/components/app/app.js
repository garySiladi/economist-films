// @flow
import React from 'react';
import { Button } from 'react-bootstrap';
import Navigation from '../navigation/navigation';
import SidePanel from '../side-panel/side-panel';
import './app.css';

// App needs to be a class in order to allow hot-reloading
// that's why we disable react/prefer-stateless-function
class App extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className="app">
        <SidePanel user={{ id: 1, name: 'Profile Name', imgUrl: 'x' }} />
        <div>
          <p>This is app page</p>
          <Button bsStyle="success" bsSize="large">bootstrap is working</Button>
          <Navigation />
        </div>
      </div>
    );
  }
}

export default App;
