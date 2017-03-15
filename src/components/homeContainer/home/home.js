// @flow
import React from 'react';
import { Link } from 'react-router';
import DataStructure from '../../../structures/shelves';

const Home = ({ shelves }: DataStructure) => (
  <div className="home">
    <span>{shelves ? shelves[0].title : 'Loading...'}</span>
    <p>Home page</p>
    <button type="button">
      <Link to="/">
        Back
      </Link>
    </button>

  </div>
);

export default Home;
