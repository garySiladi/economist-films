// @flow
import React from 'react';
import Home from './home';
import DataStructure from '../../structures/shelves';


class HomeContainer extends React.Component {
  state: {
     data: DataStructure
  };

  constructor() {
    super();
    this.state = {
      data: {},
    };
  }

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
        //I recieved  array of shelves
        {this.state.data.shelves ? <p>{this.state.data.shelves[0].title}</p> : <p>Loading...</p>}
        <Home />
      </div>
    );
  }
}

export default HomeContainer;
