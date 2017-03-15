// @flow
import React from 'react';
import Home from './home/home';
import DataStructure from '../../structures/shelves';

class HomeContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      data: {},
    };
  }
  state: {
     data: DataStructure
  };
  componentWillMount() {
    /* istanbul ignore next */
    fetch('https://economist.twivel.io/api/v1/root/json', {
      method: 'GET',
    })
    .then(response => response.json())
    .then((data) => {
      this.setState({ data });
    });
  }
  render() {
    return (
      <div className="home-container">
        {this.state.data.shelves ? <Home shelves={this.state.data.shelves} /> : null}
      </div>
    );
  }
}
export default HomeContainer;
