// @flow
import React from 'react';

// App needs to be a class in order to allow hot-reloading
// that's why we disable react/prefer-stateless-function
class App extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className="app">
        App
      </div>
    );
  }
}

export default App;
