// @flow
import React from 'react';
import { Button } from 'react-bootstrap';
import Navigation from '../navigation/navigation';


// App needs to be a class in order to allow hot-reloading
// that's why we disable react/prefer-stateless-function
class App extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className="app">
        <p>This is app page</p>
        <Button bsStyle="success" bsSize="large">bootstrap is working</Button>
        <Navigation />
      </div>
    );
  }
}

export default App;
