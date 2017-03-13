// @flow
import React from 'react';
import Home from '../home/home';
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
      <div>
        {this.state.data.shelves ? <p>{this.state.data.shelves[0].title}</p> : <p>Loading...</p>}
        <Home />
      </div>
    );
  }
}

export default HomeContainer;
