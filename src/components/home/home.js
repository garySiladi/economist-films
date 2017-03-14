// @flow
import React from 'react';
import { Link } from 'react-router';
import DataStructure from '../../structures/shelves';

const Home = (props: DataStructure) => {
  console.log('ll:', props);
  return (
    <div>
      <span>{props.data.shelves[0].title}</span>
      <span>Home page</span>
      <button type="button">
        <Link to="/">
          Back
        </Link>
      </button>
    </div>
  );
}

export default Home;
