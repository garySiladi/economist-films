// @flow
import React from 'react';
import { Link } from 'react-router';

const Nav = () => (
  <div>
    <ul>
      <li><Link to="/home">Home</Link></li>
      <li><Link to="/about">about</Link></li>
    </ul>
  </div>
);

export default Nav;
