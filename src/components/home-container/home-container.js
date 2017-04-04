// @flow
import React from 'react';
import Home from './home/home';
import DataStructure from '../../structures/shelves';
import { getRoot } from '../../api/fetch';

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
    getRoot()
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
