// @flow
import React from 'react';
import { Link } from 'react-router';

const Home = () => (
  <div>
    <span>This is the home page</span>
    <button type="button">
      <Link to="/">
        Back
      </Link>
    </button>
  </div>
);

export default Home;
